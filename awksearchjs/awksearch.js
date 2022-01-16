function awk_setup(data, data_template, metadata_template) {
    const awk_input = document.createElement("input");
    const awk_metadata_output = document.createElement("div");
    const awk_data_output = document.createElement("div");

    awk_input.id = "awk_input";
    awk_metadata_output.id = "awk_metadata_output";
    awk_data_output.id = "awk_data_output";

    awk_input.oninput = function (event) {
        const regex = new RegExp(this.value, "gi");
        filtered_data = data.filter(item => JSON.stringify(item).match(regex));
        awk_metadata_output.innerHTML = metadata_template(filtered_data);
        awk_data_output.innerHTML = filtered_data.map(data_template).join("");
    }

    document.body.appendChild(awk_input);
    document.body.appendChild(awk_metadata_output);
    document.body.appendChild(awk_data_output);

    awk_input.focus();
    awk_metadata_output.innerHTML = metadata_template(data);
    awk_data_output.innerHTML = data.map(data_template).join("");
}
