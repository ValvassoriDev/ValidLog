"use client";

import { useState, useEffect, useRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormField {
  id: string;
  label: string;
  required?: boolean;
  type?:
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "search-select"
  | "textarea";
  options?: SelectOption[];
  placeholder?: string;
  readonly?: boolean
}

interface FormBaseProps {
  title: string;
  fields: FormField[];
  onSubmit: (form: Record<string, string>) => Promise<boolean>;
  buttonText?: string;
  error?: string | null | undefined;
  onSuccess?: () => void;
  initialValues?: Record<string, string>;
  records?: any[];
}

export function FormBase({
  title,
  fields,
  onSubmit,
  buttonText = "Salvar",
  error,
  onSuccess,
  initialValues,
}: FormBaseProps) {
  const [form, setForm] = useState<Record<string, string>>(
    initialValues || Object.fromEntries(fields.map((f) => [f.id, ""]))
  );

  const [internalError, setInternalError] = useState(error || "");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setInternalError("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchTerm(value);
    setShowDropdown(true);
  };

  const handleSelectOption = (
    fieldId: string,
    value: string,
    label: string
  ) => {
    setForm((prev) => ({ ...prev, [fieldId]: value }));
    setSearchTerm(label);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInternalError("");
    setLoading(true);

    try {
      const success = await onSubmit(form);
      if (success) {
        onSuccess?.();
        if (!initialValues) {
          setForm(Object.fromEntries(fields.map((f) => [f.id, ""])));
          setSearchTerm("");
        }
      }
    } catch (err: any) {
      setInternalError(err?.message || "Erro ao enviar o formulário.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto rounded-lg shadow-md border border-border overflow-hidden">
        <div className="p-6 bg-primary border-b border-border">
          <h2 className="text-xl text-primary-foreground font-semibold">
            {title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {(internalError || error) && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200">
              {internalError || error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map((field) => (
              <div
                key={field.id}
                className={`space-y-2 relative ${field.type === "textarea" ? "md:col-span-2" : "col-span-1"
                  }`}
              >
                <label
                  htmlFor={field.id}
                  className="block text-sm font-medium text-card-foreground"
                >
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    id={field.id}
                    value={form[field.id] || ""}
                    onChange={handleChange}
                    required={field.required}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white min-h-[150px] max-h-[300px] overflow-y-auto resize-none"
                    rows={8}
                    placeholder={field.placeholder}
                  />
                ) : field.type === "select" ? (
                  <select
                    id={field.id}
                    value={form[field.id] || ""}
                    onChange={handleChange}
                    required={field.required}
                    disabled={loading}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                  >
                    <option value="">Selecione...</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "search-select" ? (
                  <div className="relative w-full" ref={dropdownRef}>
                    <input
                      type="text"
                      id={field.id}
                      value={searchTerm || form[field.id] || ""}
                      onChange={handleSearchChange}
                      onFocus={() => setShowDropdown(true)}
                      required={field.required}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white"
                      placeholder={field.placeholder || "Pesquisar..."}
                    />
                    {showDropdown && field.options && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-border rounded-md shadow-lg max-h-60 overflow-auto">
                        {field.options
                          .filter((option) =>
                            option.label
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase())
                          )
                          .map((option) => (
                            <div
                              key={option.value}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                handleSelectOption(
                                  field.id,
                                  option.value,
                                  option.label
                                )
                              }
                            >
                              {option.label}
                            </div>
                          ))}
                      </div>
                    )}
                    <input
                      type="hidden"
                      name={field.id}
                      value={form[field.id] || ""}
                    />
                  </div>
                ) : (
                  <input
                    readOnly={field.readonly}
                    type={field.type || "text"}
                    id={field.id}
                    value={form[field.id] || ""}
                    onChange={handleChange}
                    required={field.required}
                    disabled={field.readonly}
                    className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white disabled:bg-gray-200"
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full py-3 bg-primary text-primary-foreground  font-semibold rounded-md hover:bg-blue/50 transition-colors text-lg font-medium disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processando...
              </span>
            ) : (
              buttonText
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
