import React from 'react'
import './ExpenseList.css'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from 'react-icons/md'

const ExpenseList = ({expenses,handleDelete,hadleEdit, clearItem}) => {
	return (
	  <>
	  	<ul className="list">
			{/* Expense Item */}
			{
				// expenses 임시 데이터 바탕으로 객체 갯수 만큼 ExpenseItem 만들어줘
				expenses.map(Expenses => {
					return(
						// expenses 임시 데이터 ExpenseItem 넣어주기
						<ExpenseItem 
							Expenses = {Expenses} key={Expenses.id}
							handleDelete = {handleDelete}
							hadleEdit = {hadleEdit}
						></ExpenseItem>
					)
				})
			}
		</ul>
		{expenses.length > 0 &&(
			<button className="btn" onClick={clearItem}>
				목록 지우기
				<MdDelete className='btn-icon'/>
			</button>
		)}
	  </>
	)
}

export default ExpenseList