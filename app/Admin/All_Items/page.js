import { useContext, useEffect, useState } from "react";
import { MyContext } from "@/app/Components/MyContext";
import ItemCard from "@/app/Components/ItemCard";
import EditItemModal from "@/app/Components/EditItemModal";

export default function AllItems() {
  const { getAllItems, deleteItem } = useContext(MyContext);
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      const allItems = await getAllItems();
      setItems(allItems);
    };

    fetchItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deleteItem(itemId);
      setItems(items.filter(item => item.id !== itemId));
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  const handleEditSave = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
    setIsEditModalOpen(false);
  };

  return (
    <div className="ml-105 p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#bea8aa] mb-6 text-center">All Items</h1>

      {items.length === 0 ? (
        <p className="text-center text-[#a8b2a1]">No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative">
              <ItemCard item={item} />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  className="bg-blue-500 hover:bg-blue-400 text-white px-2 py-1 rounded text-sm"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded text-sm"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditModalOpen && (
        <EditItemModal
          item={selectedItem}
          onSave={handleEditSave}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
}