function build_handler(data, render) {
    return function (event) {
        const regex = new RegExp(this.value, "gi");
        return render(data.filter(item => item.toString().match(regex)));
    }
}

function build_render(container, template) {
    return function (data) {
        container.innerHTML = data.map(template).join("");
    }
}

function _onload(data, template) {
    const user_input = document.createElement("input");
    const container = document.createElement("div");

    user_input.className = "user-input";
    container.className = "container";

    const render = build_render(container, template);
    const handler = build_handler(data, render);

    user_input.addEventListener("input", handler);

    document.body.appendChild(user_input);
    document.body.appendChild(container);

    user_input.focus();
    render(data);
}
