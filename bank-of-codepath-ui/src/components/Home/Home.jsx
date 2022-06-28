import { useEffect, useState } from "react";
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import axios from "axios";
import { API_BASE_URL } from "../../constants";

export default function Home({
  transactions,
  setTransactions,
  transfers,
  setTransfers,
  error,
  setError,
  isLoading,
  setIsLoading,
  filterInputValue,
  newTransactionForm,
  setNewTransactionForm,
  isCreating,
  setIsCreating
}) {

  const [filteredTransactions, setFilteredTransactions] = useState([]);
  useEffect(async () => {
    setIsLoading(true);
    await getTransactions();
    await getTransfers();
    setIsLoading(false);
  }, []);

  useEffect(()=> {
    if (transactions && transactions.length > 0) filterTransactions(transactions);
  }, [transactions])

  const filterTransactions = (arrayToFilter) => {
    if (filterInputValue == "") {
      setFilteredTransactions(arrayToFilter);
    };

    let auxArray = [];
    for (let i = 0; i < arrayToFilter.length; i++) {
      if (!arrayToFilter[i].description.includes(filterInputValue)) continue;
      auxArray.push(arrayToFilter[i]);
    };

    setFilteredTransactions(auxArray);
  }

  const getTransactions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bank/transactions`);
      const data = response.data;
      // amount: -20000
      // category: "Fashion"
      // description: "Programming Shirt that says 'There's no place like 127.0.0.1'"
      // id: 11
      // postedAt: "2022-02-28T01:00:00.475Z"
      setTransactions(data.transactions);
      filterTransactions(data.transactions);
    } catch (error) {
      setError(error)
    }
  }

  const getTransfers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/bank/transfers`);
      const data = response.data;
      // amount: -99999.99
      // id: 1
      // memo: "rent payment"
      // postedAt: "2022-03-01T10:30:00.123Z"
      // recipientEmail: "landlord@gmail.com"
      setTransfers(data.transfers);
    } catch (error) {
      setError(error)
    }
  }

  const handleOnSubmitNewTransaction = async () => {
    setIsCreating(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/bank/transactions`, {
        transaction: newTransactionForm
      });
      const data = response.data;
      setTransactions(prev => [
        ...prev,
        data.transaction
      ])

      setNewTransactionForm({
        category: "",
        description: "",
        amount: 0
      })
      setIsCreating(false);
    } catch (error) {
      setError(error)
    }
  }

  return (
    <div className="home">
      <AddTransaction
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        form={newTransactionForm}
        setForm={setNewTransactionForm}
        handleOnSubmit={handleOnSubmitNewTransaction}
      />
      {error == "" && isLoading && <h1>Loading...</h1>}
      {error == "" && !isLoading && <BankActivity transfers={transfers} transactions={filteredTransactions} />}
      {error != "" && <h2 className="error">{error}</h2>}
    </div>
  )
}
