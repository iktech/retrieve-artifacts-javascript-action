module.exports = {
    // ... other configuration ...

    reporters: [
        "default",
        ["jest-junit", { outputDirectory: './', outputName: 'junit.xml' }]
    ]
};
