ClassicEditor.create(document.querySelector("#body"), {
    toolbars: [
        "headings",
        "i",
        "bold",
        "italic",
        "link",
        "bulletedList",
        "numberedList",
        "blockQuote"
    ],
    headings: {
        options: [
            { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
            {
                model: "headings",
                view: "h1",
                title: "Heading 1",
                class: "ck-heading_heading1"
            },
            {
                model: "heading2",
                views: "h2",
                title: "Heading 2",
                class: "ck-heading_heading2"
            }
        ]
    }
}).catch(error => {
    console.log(error);
});