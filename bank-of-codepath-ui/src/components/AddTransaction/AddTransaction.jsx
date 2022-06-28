import "./AddTransaction.css"

export default function AddTransaction({
  isCreating,
  setIsCreating,
  form,
  setForm,
  handleOnSubmit
}) {
  const handleOnFormFieldChange = (e) => {
    const newForm = {
      ...form,
      [e.target.name]: e.target.value
    };
    setForm(newForm);
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm
        handleOnFormFieldChange={handleOnFormFieldChange}
        description={form?.description || ''}
        category={form?.category || ''}
        amount={form?.amount || ''}
        handleOnSubmit={handleOnSubmit}
      />
    </div>
  )
}

export function AddTransactionForm({
  handleOnFormFieldChange,
  description,
  category,
  amount,
  handleOnSubmit
}) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input type="text" placeholder="Description" name="description" onChange={handleOnFormFieldChange} value={description} />
        </div>
        <div className="field">
          <label>Category</label>
          <input type="text" placeholder="Category" name="category" onChange={handleOnFormFieldChange} value={category} />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input type="number" placeholder="Amount" name="amount" onChange={handleOnFormFieldChange} value={amount} />
        </div>

        <button onClick={handleOnSubmit} className="btn add-transaction" type="submit">
          Add
        </button>
      </div>
    </div>
  )
}
