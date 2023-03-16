import { useState, useEffect } from "react";
import * as C from "./App.styles";
import { Item } from "./types/Item";
import { Category } from "./types/Category";
import { categories } from "./data/categories";
import { items } from "./data/items";
import { getCurrentMonth, filterListByMonth } from "./helpers/dateFilter";
import { TableArea } from "./components/TableArea";
import { ChakraProvider } from "@chakra-ui/react";
import { InfoArea } from "./components/InfoArea";
import { InsertArea } from "./components/InsertArea";

const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonth());
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    let incomeCount = 0
    let expenseCount= 0

    for(let i in filteredList){
      if(categories[filteredList[i].category].expense){
        expenseCount+= filteredList[i].value
      } else{
        incomeCount += filteredList[i].value
      }
    }
    setIncome(incomeCount)
    setExpense(expenseCount)

  }, [filteredList]);

  useEffect(() => {
    setFilteredList(filterListByMonth(list, currentMonth));
  }, [list, currentMonth]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMonth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  }

  return (
    <ChakraProvider>
      <C.AppContainer>
        <C.Header>
          <C.HeaderText>Sistema Financeiro</C.HeaderText>
        </C.Header>
        <C.Body>
          <InfoArea
            currentMonth={currentMonth}
            onMonthChange={handleMonthChange}
            income={income}
            expense={expense}
          />

          <InsertArea onAdd={handleAddItem}/>

          <TableArea list={filteredList} />
        </C.Body>
      </C.AppContainer>
    </ChakraProvider>
  );
};

export default App;
