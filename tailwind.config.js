/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "var(--text-color)",
        secondaryTextColor: "var(--secondaryTextColor)",
        labelFontSize: "var(--label-font-size",
        labelLineHeight: "var(--label-line-height)",
        defaultBorderColor: "var(--default-border-color)",
        activeBorderColor: "var(--active-border-color)",
        errorBorderColor: "var(--error-border-color)",
        defaultBackroundColor: "var(--default-backround-color)",
        activeBackroundColor: "var(--active-backround-color)",
        errorBackgroundColor: "var(--error-backround-color)",
        inactiveButtonColor: "var(--inactive-button-color)",
        defaultButtonColor: "var(--default-button-color)",
        hoverButtonColor: "var(--hover-button-color)",
      }
    },
    variants: {
      opacity: ({
        after
      }) => after(['disabled'])
    },
  },
  plugins: [],
}