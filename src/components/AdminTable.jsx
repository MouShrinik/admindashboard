const AdminTable = ({
  handleSelectAll,
  currentRows,
  selectedRows,
  filteredUsers,
  currentPage,
  pageSize,
  handleCheckboxChange,
  editedUser,
  handleInputChange,
  handleEditClick,
  handleDeleteClick,
  handleSaveEdit,
  emailError,
  nameError,
}) => {
  return (
    <>
      <table
        className="user-table w-full text-sm text-left rtl:text-right 
      text-gray-500"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-800">
          <tr className=" border-b">
            <td className="w-4 p-4 dark:bg-gray-950">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 
                  border-gray-300 rounded focus:ring-blue-500 
                   focus:ring-2 dark:bg-gray-900"
                  onChange={() => handleSelectAll(currentRows)}
                  checked={selectedRows.length === currentRows.length}
                />
                <label htmlFor="checkbox-all-search" className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
            <th
              scope="col"
              className="px-6 py-3 dark:bg-gray-950 dark:text-gray-200"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 dark:bg-gray-950 dark:text-gray-200"
            >
              Email
            </th>
            <th
              scope="col"
              className="px-6 py-3 dark:bg-gray-950 dark:text-gray-200"
            >
              Role
            </th>
            <th
              scope="col"
              className="px-6 py-3 dark:bg-gray-950 dark:text-gray-200"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers
            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
            .map((user) => (
              <tr
                key={user.id}
                className={`${
                  selectedRows.includes(user.id)
                    ? "bg-gray-300 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-800 !important"
                    : ""
                } ' hover:bg-gray-100  dark:hover:bg-gray-900 dark:text-gray-400 bg-white'`}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(user.id) ? true : false}
                      onChange={() => handleCheckboxChange(user.id)}
                      className="w-4 h-4 text-blue-600 
                      border-gray-300 rounded 
                      focus:ring-blue-500
                       focus:ring-2 dark:focus:ring-4"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>

                {editedUser?.id === user.id ? (
                  <>
                    <td>
                      <div className="px-6 py-2">
                        <label
                          className="block mb-2 text-sm font-medium 
                        text-gray-900 dark:text-gray-300"
                        >
                          Name:
                          <input
                            type="text"
                            name="name"
                            value={editedUser.name}
                            onChange={handleInputChange}
                            className="shadow-sm bg-gray-50 border 
                            border-gray-300 text-gray-900 
                          text-sm rounded-lg focus:ring-blue-600 
                          focus:ring-1 focus:border-blue-600  md:w-full 
                          p-2.5 focus:outline-none dark:bg-gray-600 
                          dark:border-gray-800 dark:focus:ring-3 dark:text-gray-300"
                            aria-invalid={nameError ? "true" : "false"}
                          />
                          {nameError && (
                            <div className="text-red-500 text-xs font-semibold">
                              {nameError}
                            </div>
                          )}
                        </label>
                      </div>
                    </td>

                    <td>
                      <div className="px-6 py-2">
                        <label
                          className="block mb-2 text-sm font-medium 
                        text-gray-900 dark:text-gray-300"
                        >
                          Email:
                          <input
                            type="text"
                            name="email"
                            value={editedUser.email}
                            onChange={handleInputChange}
                            className="shadow-sm bg-gray-50 border 
                            border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-600 focus:border-blue-600 
                          focus:outline-none focus:ring-1  md:w-full p-2.5 dark:bg-gray-600 
                          dark:border-gray-800 dark:focus:ring-3 dark:text-gray-300"
                            aria-invalid={emailError ? "true" : "false"}
                          />
                          {emailError && (
                            <div className="text-red-500 text-xs font-semibold">
                              {emailError}
                            </div>
                          )}
                        </label>
                      </div>
                    </td>

                    <td>
                      <div className="px-6 py-2">
                        <label
                          className="block mb-1 text-sm font-medium 
                        text-gray-900 dark:text-gray-300"
                        >
                          Role:
                          <input
                            type="text"
                            name="role"
                            value={editedUser.role}
                            onChange={handleInputChange}
                            className="shadow-sm bg-gray-50 border 
                            border-gray-300 text-gray-900 text-sm rounded-lg 
                          focus:ring-blue-600 focus:border-blue-600
                            md:w-full p-2.5 focus:outline-none focus:ring-1
                           dark:bg-gray-600 
                          dark:border-gray-800 dark:focus:ring-3 dark:text-gray-300"
                          />
                        </label>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                  </>
                )}

                <td className="px-6 py-4 flex">
                  {!editedUser.id && (
                    <button
                      onClick={() => handleEditClick(user)}
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="edit font-medium text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  )}
                  {editedUser?.id === user.id && (
                    <button
                      onClick={handleSaveEdit}
                      data-modal-target="editUserModal"
                      data-modal-show="editUserModal"
                      className="save font-medium text-blue-600 hover:underline"
                    >
                      Save
                    </button>
                  )}

                  <button
                    onClick={() => handleDeleteClick(user.id)}
                    type="button"
                    className="delete inline-flex ml-2 items-center gap-x-2 text-sm 
                    font-semibold 
                    rounded-lg border border-transparent text-blue-600
                     hover:text-blue-800 disabled:opacity-50 
                    disabled:pointer-events-none"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminTable;
