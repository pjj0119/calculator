import { useState } from "react"
import "./App.css"
import ExpenseForm from './component/ExpenseForm'
import ExpenseList from './component/ExpenseList'
import Alert from "./component/Alert"


const App = () =>{

	const [expenses, setExpenses] = useState([
		// {id: 1, charge: "렌트비", amount: 2000},
		// {id: 2, charge: "교통비", amount: 400},
		// {id: 3, charge: "식비", amount: 1200}
	]);

	//지출항목
	const [charge, setCharge] = useState('');

	//비용
	const [amount, setAmount] = useState();

	//경고문구
	const [alert, setAlert] = useState({show : false, type : null, text: null});

	//수정
	const [edit, setEdit] = useState(false);
	const [id, setId] = useState('');

	//수정 할 리스트 불러오기
	const hadleEdit = (id) => {
		const expense = expenses.find(item => item.id === id );
		const {charge, amount} = expense;
		setCharge(charge);
		setAmount(amount);
		setId(id)
		setEdit(true);
	}

	//경고문구 출력
	const handleAlert = ({type, text}) => {
		setAlert({show : true , type, text});
		setTimeout(() => {
			setAlert({show : false, type : null, text: null});
		},3000);
	}


	//지출항목 입력
	const handleCharge = (e) => {
		setCharge(e.target.value)
	}

	//비용입력
	const handleAmount = (e) => {
		//console.log(e.target.valueAsNumber);
		setAmount(e.target.valueAsNumber)
	}

	//제출버튼
	const handleSubmit = (e) => {
		e.preventDefault();
		if(charge !=="" && amount > 0){		
			if(edit){
				const newExpenses = expenses.map((item) => {
					return item.id === id ? {...item, charge, amount} : item
				});
				setExpenses(newExpenses);
				setEdit(false)
				handleAlert({type : 'success', text : '리스트가 수정되었습니다.'})
			}else{
				const newExpense = {id: crypto.randomUUID(), charge, amount};
				const newExpenses = [...expenses, newExpense]
				setExpenses(newExpenses);
				handleAlert({type : 'success', text : '리스트가 추가되었습니다.'})
			}
			setCharge('');
			setAmount('');
		}else{
			console.log('error');
			handleAlert({type : 'danger', text : '지출 항목이 빈 값일 수 없으며 비용 값은 0보다 커야 합니다.'})
		}
	}

	//쓰레기통 버튼
	const handleDelete = (id) => {
		const newExpenses = expenses.filter(expese => expese.id !== id)
		//console.log(newExpenses);
		setExpenses(newExpenses);
		handleAlert({type : 'danger', text : '리스트가 삭제되었습니다.'})
	};

	//목록지우기
	const clearItem = () =>{
		setExpenses([]);
	}


	return(
		<main className="main-container">
			{alert.show ? <Alert type={alert.type} text={alert.text}></Alert> : null}
			<h1>예산 계산기</h1>

			<div style={{width:'100%', backgroundColor:'white', padding: '1rem'}}>
				{/* Expense Form */}
				<ExpenseForm
					handleCharge = {handleCharge}
					charge = {charge}
					handleAmount = {handleAmount}
					amount = {amount}
					handleSubmit = {handleSubmit}
					edit = {edit}
				></ExpenseForm>
			</div>
			<div style={{width:'100%', backgroundColor:'white', padding: '1rem'}}>
				{/* Expense List */}
				{/* initialExpenses 임시 데이터 찔러 넣어줌 */}
				<ExpenseList 
					expenses = {expenses}
					handleDelete = {handleDelete}
					hadleEdit = {hadleEdit}
					clearItem = {clearItem}
				></ExpenseList>
			</div>

			<div style={{display:'flex', justifyContent:'end', marginTop: '1rem'}}>
				<p style={{fontSize:"2rem"}}>총 지출 : 
				<span>
					{expenses.reduce((acc,curr) => {
						return (acc += curr.amount)
					},0)}
					원
				</span>
				</p>
			</div>
		</main>
	)
}

export default App;


