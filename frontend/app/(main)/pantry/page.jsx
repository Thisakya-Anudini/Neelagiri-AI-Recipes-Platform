/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Check,
  ChefHat,
  Edit2,
  Loader2,
  Package,
  Plus,
  Sparkles,
  Trash2,
  X,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import useFetch from "@/hooks/use-fetch";
import {
  deletePantryItem,
  getPantryItems,
  updatePantryItem,
} from "@/actions/pantry.actions";
import AddToPantryModal from "@/components/AddToPantryModal";
import PricingModal from "@/components/PricingModal";
import { useAuth } from "@clerk/nextjs";

export default function PantryPage() {
  const { isSignedIn } = useAuth();
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", quantity: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterText, setFilterText] = useState("");

  const {
    loading: loadingItems,
    data: itemsData,
    fn: fetchItems,
  } = useFetch(getPantryItems);

  const {
    loading: deleting,
    data: deleteData,
    fn: deleteItem,
  } = useFetch(deletePantryItem);

  const {
    loading: updating,
    data: updateData,
    fn: updateItem,
  } = useFetch(updatePantryItem);

  useEffect(() => {
    if (!isSignedIn) return;
    fetchItems();
  }, [isSignedIn]);

  useEffect(() => {
    if (itemsData?.success) setItems(itemsData.items);
  }, [itemsData]);

  useEffect(() => {
    if (deleteData?.success && !deleting) {
      toast.success("Item removed from pantry");
      fetchItems();
    }
  }, [deleteData]);

  useEffect(() => {
    if (updateData?.success) {
      toast.success("Item updated successfully");
      setEditingId(null);
      fetchItems();
    }
  }, [updateData]);

  const handleDelete = async (itemId) => {
    const formData = new FormData();
    formData.append("itemId", itemId);
    await deleteItem(formData);
  };

  const startEdit = (item) => {
    setEditingId(item.documentId);
    setEditValues({ name: item.name, quantity: item.quantity });
  };

  const saveEdit = async () => {
    const formData = new FormData();
    formData.append("itemId", editingId);
    formData.append("name", editValues.name);
    formData.append("quantity", editValues.quantity);
    await updateItem(formData);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ name: "", quantity: "" });
  };

  const handleModalSuccess = () => {
    fetchItems();
  };

  const filteredItems = useMemo(() => {
    const query = filterText.trim().toLowerCase();
    if (!query) return items;
    return items.filter((item) =>
      String(item?.name ?? "").toLowerCase().includes(query),
    );
  }, [items, filterText]);

  return (
    <div className="min-h-screen bg-stone-50 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 rounded-2xl border-2 border-stone-900 bg-orange-50 flex items-center justify-center shrink-0">
                <Package className="w-7 h-7 text-orange-700" />
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-bold text-stone-900 tracking-tight leading-tight">
                  My Pantry
                </h1>
                <p className="text-stone-600 font-light text-base md:text-lg mt-1">
                  Keep ingredients organized and generate recipes from what you
                  already have.
                </p>
              </div>
            </div>

          </div>

          {itemsData?.scansLimit !== undefined ? (
            <div className="mt-5 bg-white border-2 border-stone-200 p-4 shadow-xs rounded-2xl">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-stone-50 border border-stone-200 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-orange-700" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-stone-900">
                    AI Pantry Scans
                  </div>
                  {itemsData.scansLimit === "unlimited" ? (
                    <div className="mt-1 text-sm text-stone-600">
                      <span className="font-bold text-emerald-700">∞</span>{" "}
                      Unlimited scans available (Pro Plan)
                    </div>
                  ) : (
                    <div className="mt-1 text-sm text-stone-600">
                      Limited scans on Free plan.{" "}
                      <PricingModal>
                        <span className="font-semibold text-orange-700 cursor-pointer hover:underline">
                          Upgrade to Pro
                        </span>
                      </PricingModal>{" "}
                      for unlimited scans.
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>


        {loadingItems ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-orange-600 animate-spin mb-4" />
            <p className="text-stone-500">Loading your pantry...</p>
          </div>
        ) : null}

        {!loadingItems && items.length > 0 ? (
          <div className="bg-white border-2 border-stone-200 rounded-3xl shadow-xs overflow-hidden">
            <div className="p-6 md:p-8 border-b border-stone-200">
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-stone-900">
                    Ingredients
                  </h2>
                  <p className="text-stone-600 font-light mt-1">
                    Add items first, then edit or remove them anytime.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-end">
                  <input
                    value={filterText}
                    onChange={(e) => setFilterText(e.target.value)}
                    placeholder="Search ingredients..."
                    className="h-10 w-full sm:w-[260px] px-3 border-2 border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors rounded-md"
                  />
                  <Badge
                    variant="outline"
                    className="text-stone-700 border-2 border-stone-900 font-bold uppercase tracking-wide justify-center"
                  >
                    {filteredItems.length}{" "}
                    {filteredItems.length === 1 ? "item" : "items"}
                  </Badge>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
                    size="lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add Ingredient
                  </Button>
                </div>
              </div>
            </div>

            <div className="divide-y divide-stone-100">
              {filteredItems.map((item) => (
                <div
                  key={item.documentId}
                  className="px-6 md:px-8 py-4 hover:bg-stone-50 transition-colors"
                >
                  {editingId === item.documentId ? (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                      <div className="md:col-span-5">
                        <input
                          type="text"
                          value={editValues.name}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              name: e.target.value,
                            })
                          }
                          className="w-full h-10 px-3 border-2 border-stone-200 focus:outline-none focus:border-orange-600 text-sm rounded-md"
                          placeholder="Ingredient name"
                        />
                      </div>
                      <div className="md:col-span-4">
                        <input
                          type="text"
                          value={editValues.quantity}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              quantity: e.target.value,
                            })
                          }
                          className="w-full h-10 px-3 border-2 border-stone-200 focus:outline-none focus:border-orange-600 text-sm rounded-md"
                          placeholder="Quantity"
                        />
                      </div>
                      <div className="md:col-span-3 flex gap-2 md:justify-end">
                        <Button
                          size="sm"
                          onClick={saveEdit}
                          disabled={updating}
                          className="bg-emerald-600 hover:bg-emerald-700 border-2 border-emerald-700"
                        >
                          {updating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Check className="w-4 h-4" />
                          )}
                          Save
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={cancelEdit}
                          disabled={updating}
                          className="border-2 border-stone-900 hover:bg-stone-900 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-stone-900 truncate">
                          {item.name}
                        </div>
                        <div className="text-sm text-stone-500 font-light truncate">
                          {item.quantity}
                        </div>
                        <div className="mt-1 text-xs text-stone-400">
                          Added {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 md:justify-end shrink-0">
                        <button
                          onClick={() => startEdit(item)}
                          className="px-3 py-2 rounded-lg border border-stone-200 hover:border-orange-600 hover:bg-orange-50 transition-all text-stone-700 hover:text-orange-700 text-sm font-medium inline-flex items-center gap-2"
                          aria-label="Edit item"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.documentId)}
                          disabled={deleting}
                          className="px-3 py-2 rounded-lg border border-stone-200 hover:border-red-600 hover:bg-red-50 transition-all text-stone-700 hover:text-red-700 text-sm font-medium inline-flex items-center gap-2 disabled:opacity-50"
                          aria-label="Delete item"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}





        

        {!loadingItems && items.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-stone-200 shadow-xs">
            <div className="bg-orange-50 w-20 h-20 rounded-2xl border-2 border-stone-900 flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-orange-700" />
            </div>
            <h3 className="text-2xl font-bold text-stone-900 mb-2">
              Your Pantry is Empty
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto font-light">
              Start by scanning your pantry with AI or adding ingredients
              manually to discover amazing recipes!
            </p>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-orange-600 hover:bg-orange-700 text-white gap-2"
              size="lg"
            >
              <Plus className="w-5 h-5" />
              Add Your First Item
            </Button>
          </div>
        ) : null}

        {!loadingItems && items.length > 0 ? (
          <div className="mt-8 flex flex-col items-center text-center">
            <Button
              asChild
              size="xl"
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-2 border-emerald-700 px-9 rounded-full shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <Link href="/pantry/recipes">
                <ChefHat className="w-5 h-5" />
                Get recipe ideas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-2 text-sm text-stone-600 font-light">
              AI suggestions using your {items.length}{" "}
              {items.length === 1 ? "ingredient" : "ingredients"}.
            </p>
          </div>
        ) : null}
      </div>

      <AddToPantryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleModalSuccess}
      />
    </div>
  );
}
