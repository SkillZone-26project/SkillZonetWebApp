import { Plus, X } from "lucide-react";

const MaterialsSection = ({
  procurementResponsibility,
  materials,
  setScopeForm,
}) => {
  const isClientProcurement =
    procurementResponsibility === "client";

  const updateMaterial = (index, field, value) => {
    const updatedMaterials = [...materials];

    updatedMaterials[index] = {
      ...updatedMaterials[index],
      [field]: value,
    };

    setScopeForm((prev) => ({
      ...prev,
      materials: updatedMaterials,
    }));
  };

  const addMaterial = () => {
    setScopeForm((prev) => ({
      ...prev,
      materials: [
        ...prev.materials,
        {
          description: "",
          quantity: 1,
          unitPrice: 0,
        },
      ],
    }));
  };

  const removeMaterial = (index) => {
    setScopeForm((prev) => ({
      ...prev,
      materials: prev.materials.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-5">

      {/* Procurement Responsibility */}

      <div>
        <label className="block text-sm font-semibold text-[#111827] mb-2">
          Material Procurement Responsibility
        </label>

        <select
          value={procurementResponsibility}
          onChange={(e) =>
            setScopeForm((prev) => ({
              ...prev,
              procurementResponsibility: e.target.value,
            }))
          }
          className="w-full h-11 min-w-0 rounded-md border border-gray-300 px-2 sm:px-3 text-xs sm:text-sm outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">
            Select procurement responsibility
          </option>

          <option value="artisan">
            Artisan Sourced — Client funds transferred directly
          </option>

          <option value="client">
            Client Self-Procurement — Client buys materials
          </option>
        </select>
      </div>

      {/* Security Note */}

      <div className="rounded-md border-l-4 border-[#D99000] bg-[#FFFBEA] p-3">

        <p className="text-sm leading-5 text-[#A65E18]">
          {isClientProcurement ? (
            <>
              <span className="font-bold">
                [Client-Sourced Materials Mode Enabled]:
              </span>{" "}
              Materials lists are preserved below for sizing reference, but costs are mapped as ₦0.00 since client executes purchasing independently.
            </>
          ) : (
            <>
              <span className="font-bold">
                Important Security Note:
              </span>{" "}
              Material funds computed below will be routed directly
              from the client to your profile. The platform's escrow wallet exclusively holds labour fees.
              
            </>
          )}
        </p>

      </div>

      {/* Supply Matrix */}

      <div>

        <h3 className="text-sm font-semibold text-[#111827] mb-4">
          Required Supply Allocation Matrix
        </h3>

        {/* Header */}

        <div className="hidden sm:grid grid-cols-[1fr_60px_90px_100px_35px] gap-2 items-center mb-2 px-2">

          <span className="text-xs font-semibold text-gray-500 uppercase">
            Item Descriptor
          </span>

          <span className="text-xs font-semibold text-gray-500 uppercase">
            Qty
          </span>

          <span className="text-xs font-semibold text-gray-500 uppercase">
            Unit Price
          </span>

          <span className="text-xs font-semibold text-gray-500 uppercase">
            Total
          </span>

          <span></span>

        </div>

        {/* Rows */}

        <div className="space-y-2">

          {materials.map((material, index) => {

            const total =
              Number(material.quantity || 0) *
              Number(material.unitPrice || 0);

            const displayedTotal =
              isClientProcurement ? 0 : total;

            return (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-[1fr_60px_90px_100px_35px] gap-3 sm:gap-2 items-start sm:items-center rounded-lg border border-gray-200 p-3 sm:p-0 sm:border-0"
              >

                <div className="w-full">
  <label className="block sm:hidden text-xs font-semibold text-gray-500 mb-1">
    Item Descriptor
  </label>

  <input
    type="text"
    value={material.description}
    onChange={(e) =>
      updateMaterial(
        index,
        "description",
        e.target.value
      )
    }
    placeholder="Cement, Piping, Wire..."
    className="w-full h-10 rounded-md border border-gray-300 px-3 text-sm outline-none focus:ring-2 focus:ring-black"
  />
</div>

                {/* Quantity */}

                <div className="w-full">
  <label className="block sm:hidden text-xs font-semibold text-gray-500 mb-1">
    Quantity
  </label>

  <input
    type="number"
    min="1"
    value={material.quantity}
    onChange={(e) =>
      updateMaterial(
        index,
        "quantity",
        e.target.value
      )
    }
    className="w-full h-10 rounded-md border border-gray-300 px-2 text-sm outline-none focus:ring-2 focus:ring-black"
  />
</div>

                {/* Unit Price */}

      <div className="w-full">
  <label className="block sm:hidden text-xs font-semibold text-gray-500 mb-1">
    Unit Price
  </label>

  <input
    type="number"
    min="0"
    value={material.unitPrice}
    onChange={(e) =>
      updateMaterial(
        index,
        "unitPrice",
        e.target.value
      )
    }
    className="w-full h-10 rounded-md border border-gray-300 px-2 text-sm outline-none focus:ring-2 focus:ring-black"
  />
</div>

                {/* Total */}

        <div className="w-full sm:w-auto">
  <label className="block sm:hidden text-xs font-semibold text-gray-500 mb-1">
    Total
  </label>

  <div className="text-sm font-bold text-[#111827]">
    ₦{Number(displayedTotal).toFixed(2)}

    {isClientProcurement && (
      <span className="block text-[10px] font-medium text-gray-500">
        [Self Procurement]
      </span>
    )}
  </div>
</div>

                {/* Delete */}

                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
                  disabled={materials.length === 1}
                  className="w-8 h-8 rounded-md bg-red-600 font-bold text-white flex items-center justify-center hover:bg-red-700 disabled:opacity-40"
                >
                  <X size={16} />
                </button>

              </div>
            );
          })}

        </div>

        {/* Add Row */}

        <button
          type="button"
          onClick={addMaterial}
          className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#E8EEF7] px-3 py-2 text-sm font-semibold text-[#111827] hover:bg-[#DCE5F2]"
        >
          <Plus size={16} />
          Add Supply Row
        </button>

      </div>

    </div>
  );
};

export default MaterialsSection;