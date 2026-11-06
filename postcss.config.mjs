const config = {
  plugins: {
    // Inlinea los @import de styles/components/*.css antes de Tailwind (necesario para @layer components)
    "postcss-import": {},
    tailwindcss: {},
    autoprefixer: {},
  },
}
export default config
