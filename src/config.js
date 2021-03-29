module.exports = {
    navLinks: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "Work",
            url: "/work",
        },
        {
            name: "About",
            url: "/about",
        }
    ],
    srConfig: (delay = 300) => ({
        delay,
        distance: '40px',
        duration: 500,
        easing: 'ease-in',
        // reset: false,
        opacity: 0,
        viewFactor: 0.25,
      }),
}