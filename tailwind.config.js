/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: ["./resources/**/*.blade.php", "./resources/**/*.js"],
    theme: {
        extend: {},
        fontFamily: {
            monster: ["Montserrat"],
        },
    },
    plugins: [require("tailwindcss-animated")],
};
