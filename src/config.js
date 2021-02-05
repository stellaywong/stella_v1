module.exports = {
    navDelay: 1000,
    navLinks: [
        {
            name: "Home",
            url: "/",
        },
        {
            name: "About",
            url: "/about",
        },
        {
            name: "Work",
            url: "/work",
        }
    ],
    srConfig: (delay = 200) => ({
        delay,
        distance: '20px',
        duration: 500,
        easing: 'ease-in',
        // reset: false,
        opacity: 0,
        viewFactor: 0.25,
      }),
}