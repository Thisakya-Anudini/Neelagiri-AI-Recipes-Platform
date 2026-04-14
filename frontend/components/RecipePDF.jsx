/* eslint-disable jsx-a11y/alt-text */
import { Document, Image, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    paddingTop: 92,
    paddingHorizontal: 32,
    paddingBottom: 54,
    fontSize: 11,
    fontFamily: "Helvetica",
    color: "#0f172a",
    backgroundColor: "#ffffff",
  },

  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 78,
    paddingHorizontal: 32,
    paddingTop: 18,
    paddingBottom: 12,
    backgroundColor: "#0b1220",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 35,
    height: 45,
    backgroundColor: "#e2e8f0",
    borderRadius: 8,
  },
  brandText: {
    fontSize: 11,
    fontWeight: 700,
    color: "#e2e8f0",
    letterSpacing: 0.2,
  },
  headerMeta: {
    fontSize: 10,
    color: "#94a3b8",
  },

  heroImageWrap: {
    marginTop: 6,
    marginBottom: 14,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  heroImage: {
    width: "100%",
    height: 190,
    objectFit: "cover",
  },

  title: {
    fontSize: 24,
    marginBottom: 6,
    fontWeight: 800,
    letterSpacing: -0.4,
  },
  description: {
    fontSize: 11.5,
    lineHeight: 1.45,
    color: "#334155",
    marginBottom: 12,
  },

  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  chip: {
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#f8fafc",
    fontSize: 10,
    color: "#0f172a",
  },
  chipAccent: {
    borderColor: "#fed7aa",
    backgroundColor: "#fff7ed",
    color: "#9a3412",
  },

  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginTop: 10,
    marginBottom: 12,
  },

  grid: {
    flexDirection: "row",
    gap: 14,
  },
  col: {
    flexGrow: 1,
    flexBasis: 0,
  },
  card: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#ffffff",
  },
  section: {
    marginBottom: 16,
  },
  heading: {
    fontSize: 12.5,
    marginBottom: 8,
    fontWeight: 800,
    color: "#0f172a",
    letterSpacing: 0.2,
  },

  listItem: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 6,
  },
  bullet: {
    width: 12,
    textAlign: "center",
    color: "#f97316",
    fontWeight: 800,
  },
  listText: {
    flex: 1,
    color: "#0f172a",
    lineHeight: 1.35,
  },
  amount: {
    color: "#9a3412",
    fontWeight: 800,
  },

  stepRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  stepNum: {
    width: 26,
    height: 26,
    borderRadius: 8,
    backgroundColor: "#f97316",
    color: "#ffffff",
    fontSize: 11,
    fontWeight: 800,
    textAlign: "center",
    paddingTop: 6,
  },
  stepBody: {
    flex: 1,
    paddingTop: 1,
  },
  stepTitle: {
    fontSize: 11.5,
    fontWeight: 800,
    color: "#0f172a",
    marginBottom: 2,
  },
  stepText: {
    fontSize: 10.8,
    lineHeight: 1.35,
    color: "#334155",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 32,
    paddingBottom: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  footerText: {
    fontSize: 9.5,
    color: "#64748b",
  },
  pageNumber: {
    fontSize: 9.5,
    color: "#64748b",
  },
});

function safeNumber(value) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function RecipePDF({ recipe, logoSrc, mealPhotoSrc }) {
  const totalMins = safeNumber(recipe.prepTime) + safeNumber(recipe.cookTime);
  const mealSrc = mealPhotoSrc || recipe.imageUrl;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header} fixed>
          <View style={styles.headerRow}>
            <View style={styles.brand}>
              {logoSrc ? <Image style={styles.logo} src={logoSrc} /> : null}
              <View>
                <Text style={styles.brandText}>Neelagiri Hotel & Bakery</Text>
                <Text style={styles.headerMeta}>Recipe Card</Text>
              </View>
            </View>
            <Text style={styles.headerMeta}>
              {recipe.cuisine} • {recipe.category} • {totalMins} mins
            </Text>
          </View>
        </View>

        {/* Hero photo */}
        {mealSrc ? (
          <View style={styles.heroImageWrap}>
            <Image style={styles.heroImage} src={mealSrc} />
          </View>
        ) : null}

        {/* Title */}
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.description}>{recipe.description}</Text>

        {/* Chips */}
        <View style={styles.chipsRow}>
          <Text style={[styles.chip, styles.chipAccent]}>{recipe.cuisine}</Text>
          <Text style={styles.chip}>{recipe.category}</Text>
          <Text style={styles.chip}>{totalMins} mins total</Text>
          <Text style={styles.chip}>{recipe.servings} servings</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.grid}>
          {/* Ingredients */}
          <View style={styles.col}>
            <View style={[styles.card, styles.section]}>
              <Text style={styles.heading}>Ingredients</Text>
              {recipe.ingredients.map((ing, i) => (
                <View key={i} style={styles.listItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.listText}>
                    {ing.item} <Text style={styles.amount}>- {ing.amount}</Text>
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Instructions */}
          <View style={styles.col}>
            <View style={[styles.card, styles.section]}>
              <Text style={styles.heading}>Step-by-step cooking</Text>
              {recipe.instructions.map((step) => (
                <View key={step.step} style={styles.stepRow}>
                  <Text style={styles.stepNum}>{step.step}</Text>
                  <View style={styles.stepBody}>
                    <Text style={styles.stepTitle}>{step.title}</Text>
                    <Text style={styles.stepText}>{step.instruction}</Text>
                  </View>
                </View>
              ))}

              {/* Tips */}
              {recipe.tips?.length > 0 ? (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.heading}>Chef’s tips</Text>
                  {recipe.tips.map((tip, i) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={[styles.listText, { color: "#334155" }]}>
                        {tip}
                      </Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>© 2026 Neelagiri Hotel & Bakery</Text>
          <Text
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
