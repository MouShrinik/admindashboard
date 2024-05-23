const DeleteSelected = ({ handleDeleteSelected }) => {
  return (
    <>
      <div className="pt-4 px-2 dark:bg-gray-950">
        <button
          onClick={handleDeleteSelected}
          type="button"
          className="inline-flex ml-2 items-center gap-x-2 text-sm font-semibold 
        rounded-lg border border-transparent text-blue-600 hover:text-blue-800 
        disabled:opacity-50 disabled:pointer-events-none"
        >
          Delete Selected
        </button>
      </div>
    </>
  );
};

export default DeleteSelected;
