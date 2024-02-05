import React from 'react'
import './ExpenseItem.css'
import {MdEdit , MdDelete} from 'react-icons/md'

const ExpenseItem = ({Expenses, handleDelete, hadleEdit}) => {
	return (
	 	<li className="item">
			<div className="info">
				{/* initialExpenses 임시 데이터 최종으로 꺼내 쓰기 */}
				<span className="expense">{Expenses.charge}</span>
				<span className="amount">{Expenses.amount} 원</span>
			</div>
			<div>
				<button className="edit-btn"
					onClick={() => hadleEdit(Expenses.id)}
				><MdEdit/></button>
				<button className="clear-btn"
					onClick={() => handleDelete(Expenses.id)}
				><MdDelete/></button>
			</div>
		</li>
	)
}

export default ExpenseItem