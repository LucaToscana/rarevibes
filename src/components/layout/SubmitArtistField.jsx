import { useTranslation } from "react-i18next";

function RenderField({ field, form, onChange, parentName = "" }) {
    const {
        id,
        label,
        type = "text",
        required,
        isTextArea,
        options,
        fields: groupFields,
        itemFields,
    } = field;
    const { t } = useTranslation("common");

    const fieldName = parentName ? `${parentName}.${id}` : id;
    const value = getValue(form, fieldName);

    // Recupera valore annidato (supporta form["a.b.c"])
    function getValue(obj, path) {
        return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj) ?? "";
    }

    // Funzione per gestire cambiamenti di campi annidati
    const handleChange = (e) => {
        onChange(e);
    };

    // Gestione campi di tipo group (ricorsivo)
    if (type === "group" && Array.isArray(groupFields)) {
        return (
            <div className="mb-4">
                <label className="block font-bold mb-2">{label}</label>
                {groupFields.map(subField => (
                    <RenderField
                        key={subField.id}
                        field={subField}
                        form={form}
                        onChange={onChange}
                        parentName={fieldName}
                    />
                ))}
            </div>
        );
    }

    if (type === "textarea" || isTextArea) {
        return (
            <div className="mb-4 ">
                <label htmlFor={fieldName} className="block font-medium mb-1">  {t(label)}</label>
                <textarea
                    id={fieldName}
                    name={fieldName}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    rows={4}
                    className=" border-[1px] border-black text-base  w-full"
                />
            </div>
        );
    }

    if (type === "select") {
        return (
            <div className="mb-4">
                <label htmlFor={fieldName} className="block font-medium mb-1">  {t(label)}</label>
                <select
                    id={fieldName}
                    name={fieldName}
                    value={value}
                    onChange={handleChange}
                    required={required}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                >
                    <option value="">Seleziona un'opzione</option>
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === "multiselect") {
        return (
            <div className="mb-4">
                <label htmlFor={fieldName} className="block font-medium mb-1"> {t(label)}</label>
                <select
                    multiple
                    id={fieldName}
                    name={fieldName}
                    value={Array.isArray(value) ? value : []}
                    onChange={e =>
                        onChange({
                            target: {
                                name: fieldName,
                                value: Array.from(e.target.selectedOptions, o => o.value),
                            },
                        })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                >
                    {options.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === "tags") {
        return (
            <div className="mb-4 font-arvo">
                <label htmlFor={fieldName} className="block font-medium mb-1"> {t(label)}</label>
                <input
                    type="text"
                    id={fieldName}
                    name={fieldName}
                    value={Array.isArray(value) ? value.join(", ") : value}
                    onChange={e =>
                        onChange({
                            target: {
                                name: fieldName,
                                value: e.target.value.split(",").map(s => s.trim()),
                            },
                        })
                    }
                    className="p-3 border-[1px] border-black text-base  w-full"
                />
                <p className="text-sm text-gray-500 mt-1">{t("separateWithComma")}</p>
            </div>
        );
    }

    if (type === "array") {
        return (
            <div className="mb-4">
                <label className="block font-bold mb-2">{label} (non ancora implementato)</label>
                <p className="text-sm text-gray-500">Supporto a array complessi in fase di sviluppo.</p>
            </div>
        );
    }

    if (type === "image-array") {
        return (
            <div className="mb-4">
                <label htmlFor={fieldName} className="block font-medium mb-1"> {t(label)}</label>
                <input
                    type="text"
                    id={fieldName}
                    name={fieldName}
                    value={Array.isArray(value) ? value.join(", ") : value}
                    onChange={e =>
                        onChange({
                            target: {
                                name: fieldName,
                                value: e.target.value.split(",").map(v => v.trim()),
                            },
                        })
                    }
                    placeholder={t("imageurls")}
                    className="p-3 border-[1px] border-black text-base w-full"
                />
                <p className="text-sm text-gray-500 mt-1">{t("separateWithComma")}</p>

            </div>
        );
    }

    // Default input
    return (
        <div className="mb-4">
            <label htmlFor={fieldName} className="block font-medium mb-1"> {t(label)}</label>
            <input
                type={type}
                id={fieldName}
                name={fieldName}
                value={value}
                onChange={handleChange}
                required={required}
                className="p-3 border-[1px] border-black text-base w-full"
            />
        </div>
    );
}
export default function SubmitArtistFields({ fields = [], form, onChange }) {
    if (!Array.isArray(fields)) {
        console.warn("SubmitArtistFields: 'fields' non è un array valido", fields);
        return null;
    }

    return (
        <>
            {fields.map(field => (
                <RenderField key={field.id} field={field} form={form} onChange={onChange} />
            ))}
        </>
    );
}