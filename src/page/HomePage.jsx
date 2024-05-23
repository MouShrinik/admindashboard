import { useEffect, useState, useCallback } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

import DeleteSelected from "../components/DeleteSelected";
import AdminTable from "../components/AdminTable";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Add a state for loading
  const [error, setError] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [editedUser, setEditedUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });

  // Fetches data from the API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // set loading state to true before fetch
      setError(null); // Clear any previous errors
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        updateTotalPages(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error.message);
      } finally {
        setIsLoading(false); // Set loading to false after fetch
      }
    };

    fetchData();
  }, []);

  const debouncedSearch = useCallback(
    (searchTerm) => {
      setFilteredUsers(
        users.filter((user) => {
          // Search logic
          return Object.values(user).some((value) =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
      setCurrentPage(1);
      updateTotalPages(filteredUsers);
    },
    [users] // Only re-create debouncedSearch when users change
  );

  useEffect(() => {
    // Apply search filter with debounced function
    const timer = setTimeout(() => debouncedSearch(searchTerm), 500);
    return () => clearTimeout(timer); // Clear timer on unmount
  }, [searchTerm, debouncedSearch]); // Re-run on searchTerm or debouncedSearch change

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // select user
  const handleCheckboxChange = (userId) => {
    // Toggle selected row
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(userId)) {
        return prevSelectedRows.filter((id) => id !== userId);
      } else {
        return [...prevSelectedRows, userId];
      }
    });
  };

  // Select all user
  const handleSelectAll = () => {
    // Select or deselect all rows on the current page
    const allIdsOnPage = filteredUsers
      .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      .map((user) => user.id);

    if (selectedRows.length === allIdsOnPage.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(allIdsOnPage);
    }
  };

  // Edit user
  const handleEditClick = (user) => {
    // Set the edited user when the edit button is clicked
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  // save with validation
  const handleSaveEdit = () => {
    let errors = {};

    // Validate the name
    if (!editedUser.name) {
      errors.name = "Please enter a name";
    }

    // Validate the email
    if (
      !editedUser.email ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editedUser.email)
    ) {
      errors.email = "Please enter a valid email address";
    }

    // If there are errors, set the error states and return
    if (Object.keys(errors).length > 0) {
      setNameError(errors.name);
      setEmailError(errors.email);
      return;
    }
    // Implement edit logic in memory(assuming no errors)
    const updatedUsers = users.map((u) =>
      u.id === editedUser.id ? editedUser : u
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    // console.log('editedUser after update:', editedUser); // Check the updated state
    // console.log('emailError after update:', emailError); // Check the updated error state
    setEditedUser({
      id: "",
      name: "",
      email: "",
      role: "",
    });
    setEmailError("");
  };

  // //existing user check
  // const userExists = (userId, allUsers) => {
  //   return allUsers.find((u) => u.id === userId);
  // };

  // Delete user
  const handleDeleteClick = (userId) => {
    // Implement delete logic in memory
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows(selectedRows.filter((id) => id !== userId));
    setEditedUser({
      id: "",
      name: "",
      email: "",
      role: "",
    });
  };

  //*** Delete Selected
  const handleDeleteSelected = () => {
    // Delete selected rows in memory
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers);
    setSelectedRows([]);
  };

  //***Generates an array of page numbers based on the current totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Calculates and updates the total number of pages based on the data and page size
  const updateTotalPages = (data) => {
    // Calculate total pages
    setTotalPages(Math.ceil(data.length / pageSize));
  };

  // Ensuring selected page is within the range (1 to totalPages)
  const handlePageChange = (number) => {
    if (number > 0 && number <= totalPages) {
      setCurrentPage(number);
    }
  };

  // Next Page
  const next = () => {
    if (currentPage === totalPages) return;

    setCurrentPage(Math.min(currentPage + 1, totalPages));
  };

  // Previous Page
  const prev = () => {
    if (currentPage === 1) return;

    setCurrentPage(Math.max(currentPage - 1, 1));
  };

  // Calculates the indices of the first and last row for the current page
  const indexOfLastRow = currentPage * pageSize;
  const indexOfFirstRow = indexOfLastRow - pageSize;
  const currentRows = filteredUsers?.slice(indexOfFirstRow, indexOfLastRow);

  useEffect(() => {
    if (currentRows?.length === 0 && currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  }, [currentRows, currentPage, setCurrentPage]);

  return (
    <div className=" bg-white dark:bg-gray-950 fixed top-0 left-0 right-0 bottom-0 p-0 m-0 overflow-auto">
      <Header />
      <div
        className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 
    flex flex-col mx-5"
      >
        <SearchBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
        />

        {isLoading && <span>Loading users...</span>}
        {error && <span>Error: {error}</span>}
        {!isLoading && !error && users.length > 0 && (
          <AdminTable
            filteredUsers={filteredUsers}
            currentPage={currentPage}
            currentRows={currentRows}
            selectedRows={selectedRows}
            handleCheckboxChange={handleCheckboxChange}
            handleSelectAll={handleSelectAll}
            pageSize={pageSize}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleSaveEdit={handleSaveEdit}
            handleInputChange={handleInputChange}
            editedUser={editedUser}
            emailError={emailError}
            nameError={nameError}
          />
        )}
        {!isLoading && !error && users.length === 0 && <p>No users found.</p>}
        <DeleteSelected handleDeleteSelected={handleDeleteSelected} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          next={next}
          prev={prev}
          pageNumbers={pageNumbers}
          handlePageChange={handlePageChange}
        />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
