let addMember = document.querySelector('#exampleModal .modal-body button');
let addExpenseModal = document.querySelector('#expenseModal');
let exDiv = document.querySelector('#expense');
let addExpensebody = document.querySelector('#expenseModal .modal-body');
let groups = document.querySelector('#groups');
let paidlist = document.querySelector('#paidlist');
let main = document.querySelector('#main');
let saveChange = document.querySelector('#exampleModal .modal-footer button:last-child');
let addExpensebutton = document.querySelector('#expenseModal .modal-footer button:last-child');

console.log('last-child', saveChange)
let group = [];
let currentGroup = "";

//set group from localstorage 'group' key
if (localStorage.getItem("group")) {
    group = JSON.parse(localStorage.getItem("group"));
    console.log("list from localstorage");
}

//settle UP Text
function settleUpText(fromName,inr,toName){
    let settle = document.querySelector('#settleModal .modal-body')
    let div=document.createElement('div');
    let span=document.createElement('span');
    span.innerText=fromName+"  have to pay  ";
    let span1=document.createElement('span');
    span1.innerText="Rs. "+inr+" to ";
    let span2=document.createElement('span');
    span2.innerText="  "+toName;
    div.appendChild(span);
    div.appendChild(span1);
    div.appendChild(span2);
    settle.appendChild(div);
    group=JSON.parse(localStorage.getItem('group'));

}

//SettleUp
function settleUp() {
    group=JSON.parse(localStorage.getItem('group'));
    let recent = group.filter((item) => item.gname == currentGroup);
    let settle = document.querySelector('#settleModal .modal-body')
    settle.innerHTML = "";
    let memberB = [];
    let memberF = [];
    console.log('clicked');
    console.log('recent',group);

    if (recent.length > 0) {
        for (let i = 0; i < recent[0].member.length; i++) {
            if (Number(recent[0].member[i].tExpense) > 0) {
                // console.log("borrower", recent[0].member[i])
                memberB.push(recent[0].member[i]);
                // console.log("memberBBB", memberB)
                // console.log("memberBBB", memberB[0].tExpense)
            }
            else {
                // console.log("Fianncer", recent[0].member[i])
                memberF.push(recent[0].member[i]);
                // console.log("memberFFF", memberF)
            }

            // let p = document.createElement('p');
            // p.innerText = recent[0].member[i].name;
            // let pa = document.createElement('p');
            // pa.innerText = recent[0].member[i].tExpense;
            // p.appendChild(pa);
            // settle.appendChild(p);
        }
        console.log("memberB", memberB)
        console.log("memberF", memberF)
        let totalF = 0;
        let totalB = 0;
        let totalfb = 0
        for (let v = 0; v < memberB.length; v++) {
            totalB += Number(memberB[v].tExpense)
        }


        console.log("totalfb", totalfb)

        if (memberB.length > 0 && memberF.length > 0) {
            // console.log("Price--Finance", Number(memberF[0].tExpense));
            // console.log("memberB", memberB);
            // console.log("memberF", memberF);
            for (let i = 0, j = 0; Number(totalB) > 1; i++) {
                // console.log("i-j-k", i, j);
                // console.log("loop");
                if (i > memberB.length - 1) {
                    // console.log(memberB)
                    // console.log(memberF)
                    memberB = memberB.filter((item) => Number(item.tExpense) > 0);
                    memberF = memberF.filter((item) => Number(item.tExpense) < 0);
                    // console.log("memberB---i", memberB);
                    // console.log("memberF---i", memberF);
                    if (memberB.length > 0) {
                        i = 0;
                    }
                    if (memberF.length > 0) {
                        j = 0;
                    }

                }
                if (j > memberF.length - 1) {
                    console.log(memberB)
                    console.log(memberF)
                    memberB = memberB.filter((item) => Number(item.tExpense) > 0);
                    memberF = memberF.filter((item) => Number(item.tExpense) < 0);
                    // console.log("memberB---j", memberB);
                    // console.log("memberF---j", memberF);
                    if (memberB.length > 0) {
                        i = 0;
                    }
                    if (memberF.length > 0) {
                        j = 0;
                    }
                }
        
                let price = Number(memberB[i].tExpense) + Number(memberF[j].tExpense);

                // console.log(" memberF[0].tExpense", memberF[j].tExpense, i, j);
                // console.log(" memberB[i].tExpense", memberB[i].tExpense, i, j);

                console.log("price", price);
                if (price > 0 || price == 0) {
                    console.log(memberB[i].name, "have to pay", Number(-memberF[j].tExpense), memberF[j].name);
                    settleUpText(memberB[i].name,Number(-memberF[j].tExpense),memberF[j].name)
                    memberF[j].tExpense = 0;
                    memberB[i].tExpense = price;
                    // console.log("member of F", memberF[j].tExpense, memberF[j].name)

                    // memberB[i].tExpense=price;
                    for (let p = 0; (price > 1) || (price > 0); p++) {
                        j++;
                        if (memberF.length == j) {
                            j--;
                            break;
                        }
                        else {
                            let pr = Number(memberB[i].tExpense) + Number(memberF[j].tExpense);
                            price = pr;

                            if (pr > 0 && pr < 1) {

                                console.log(memberB[i].name, "have to pay", Number(-memberF[j].tExpense), memberF[j].name);
                                settleUpText(memberB[i].name,Number(-memberF[j].tExpense),memberF[j].name)
                                memberF[j].tExpense = 0;
                                memberB[i].tExpense = price;
                                // console.log("member of F", memberF[j].tExpense, memberF[j].name)
                                // console.log("price----inside", price);
                            }
                            else if (pr > 0) {

                                console.log(memberB[i].name, "have to pay", Number(-memberF[j].tExpense), memberF[j].name);
                                settleUpText(memberB[i].name,Number(-memberF[j].tExpense),memberF[j].name)
                                memberF[j].tExpense = 0;
                                memberB[i].tExpense = pr;

                            }
                        }
                    }

                }
                else {
                    // console.log(memberB[i].name, "have to pay", Number(memberB[i].tExpense), memberF[j].name);
                    console.log(memberB[i].name, "have to pay", Number(memberB[i].tExpense), memberF[j].name);
                    settleUpText(memberB[i].name,Number(memberB[i].tExpense),memberF[j].name)
                    memberB[i].tExpense = 0;
                    memberF[j].tExpense = price;
                    // console.log("member of F", memberF[j].tExpense, memberF[j].name)
                    for (let p = 0; (price < 1) || (price < 0); p++) {
                        i++;
                        if (memberB.length == i) {
                            i--;
                            break;
                        }
                        else {
                            // console.log(" memberF[0].tExpense-bb", memberF[j].tExpense, i, j);
                            // console.log(" memberB[i].tExpense-bb", memberB[i].tExpense, i, j);

                            let pr = Number(memberB[i].tExpense) + Number(memberF[j].tExpense);
                            price = pr;
                            // console.log("price-bb", price);
                            if (pr > 0 && pr < 1) {
                                console.log(memberB[i].name, "have to pay", Number(memberB[i].tExpense), memberF[j].name);
                                settleUpText(memberB[i].name,Number(memberB[i].tExpense),memberF[j].name)
                                memberB[i].tExpense = 0;
                                memberF[j].tExpense = price;
                                // console.log("member of F", memberF[j].tExpense, memberF[j].name)
                                // console.log("price----inside-bb", price);
                            }
                            else if (pr < 0) {

                                console.log(memberB[i].name, "have to pay", Number(memberB[i].tExpense), memberF[j].name);
                                settleUpText(memberB[i].name,Number(memberB[i].tExpense),memberF[j].name)
                                memberF[j].tExpense = pr;
                                memberB[i].tExpense = 0;
                                // console.log("member of F", memberF[j].tExpense, memberF[j].name)
                            }
                        }
                    }

                }
                totalB = 0;
                for (let v = 0; v < memberB.length; v++) {
                    totalB += Number(memberB[v].tExpense)
                }
            }
        }
    }
}

//set datalist from group
function setOption() {
    groups.innerHTML = "";
    if (group.length > 0) {


        for (let i = 0; i < group.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', group[i].gname);
            groups.appendChild(option);
        }


    }
    // settleUp();
}
setOption();
//set Expense History from group
function setExpenseHistory() {
    let exph = document.querySelectorAll('#exphis');
    let expv = document.getElementById('exvalue');
    // console.log("exph", exph)
    if (exph.length > 0) {
        for (let i = 0; i < exph.length; i++) {
            exph[i].remove();
        }
    }
    // console.log("currentGroup", currentGroup);
    if (currentGroup != "") {
        // console.log(recent.transaction.length)
        let recent = group.filter((item) => item.gname == currentGroup);
        expv.innerText = "Rs. " + recent[0].tExpense;
        // console.log(recent);
        let br1 = document.createElement('br');
        let br = document.createElement('br');
        let div2 = document.createElement('div');
        div2.id = 'exphis';
        div2.appendChild(br);

        let debdiv = document.createElement('div');
        let divd = document.createElement('div');
        divd.className = 'debheader';
        debdiv.className = 'debdiv'
        let span = document.createElement('span');
        span.innerText = " Name";
        let span2 = document.createElement('span');
        span2.innerText = "Rs. Debt"
        divd.appendChild(span)
        divd.appendChild(span2)
        debdiv.appendChild(divd)
        for (let i = 0; i < recent[0].member.length; i++) {
            let div = document.createElement('div');
            let span = document.createElement('span');
            span.innerText = recent[0].member[i].name;
            let span2 = document.createElement('span');
            span2.innerText = "Rs. " + (recent[0].member[i].tExpense ? recent[0].member[i].tExpense : 0);
            div.appendChild(span)
            div.appendChild(span2)
            debdiv.appendChild(div)

        }

        div2.appendChild(debdiv);
        div2.appendChild(br1);
        let div = document.createElement('h5');
        let button = document.createElement('button');
        button.innerText = "Settle Expense"
        div.innerText = "Expense History";
        button.className = "settle"

        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#settleModal');
        button.style.fontSize = "15px"
        button.style.marginLeft = "15px"
        button.addEventListener('click', () => settleUp());

        div.appendChild(button);
        div2.appendChild(div);


        main.appendChild(div2);
        for (let i = 0; i < recent[0].transaction.length; i++) {

            let div = document.createElement('div');
            let mdiv = document.createElement('div');

            div.id = 'exhistory';
            let span = document.createElement('span');
            span.innerText = recent[0].transaction[i].paidby;
            let span2 = document.createElement('span');
            span2.innerText = "PAID FOR"
            let purpose = document.createElement('div');
            let expense = document.createElement('div');
            purpose.innerText = recent[0].transaction[i].purpose;
            expense.innerText = "Rs. " + recent[0].transaction[i].expense;
            let pfor = document.createElement('div');
            pfor.className = "pformember"
            let pforh = document.createElement('span');
            pforh.innerText = "By: "
            pfor.appendChild(pforh);
            // console.log("paid for length", recent[0].transaction[i].paidfor.length);
            for (let j = 0; j < recent[0].transaction[i].paidfor.length; j++) {
                let pforspan = document.createElement('span');
                pforspan.innerText = recent[0].transaction[i].paidfor[j] + "  ";
                pfor.appendChild(pforspan);

            }
            div.appendChild(span);
            div.appendChild(span2);
            div.appendChild(purpose);
            div.appendChild(expense);
            mdiv.appendChild(div);
            mdiv.appendChild(pfor);
            div2.appendChild(mdiv);


        }
        main.appendChild(div2);
        // settleUp();
    }
}
setExpenseHistory();
// settleUp();


//prevent form submission
let form = document.querySelector('form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
});

//Render Expense

function renderExpense(gname) {
    exDiv.innerHTML = "";
    let exgName = group.filter((item) => item.gname === gname);
    let h3 = document.createElement('h3');
    h3.innerText = "Total Expense"
    let h4 = document.createElement('h4');
    h4.id = "exvalue"
    h4.innerText = "Rs. " + exgName[0].tExpense;
    let div = document.createElement('div');
    let button = document.createElement('button');
    button.className = "exadd";
    button.innerText = '+';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#expenseModal');
    let span = document.createElement('span');
    span.innerText = '  Add Expense';
    let br = document.createElement('br');
    div.appendChild(button);
    div.appendChild(span);
    exDiv.appendChild(h3);
    exDiv.appendChild(h4);
    exDiv.appendChild(br);
    exDiv.appendChild(div);
    // console.log(exgName[0].member.length);

    //add expense paid by
    paidlist.innerHTML = "";
    for (let i = 0; i < exgName[0].member.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', exgName[0].member[i].name);
        paidlist.appendChild(option);
    }
    //add Expense modal paid for
    let checkspan = document.querySelector('#expenseModal .modal-body div:last-child')
    if (checkspan) {
        // console.log(checkspan)

        checkspan.innerHTML = "";


    }

    for (let i = 0; i < exgName[0].member.length; i++) {
        let span = document.createElement('span');
        span.innerText = " " + exgName[0].member[i].name + " ";
        let check = document.createElement('input');
        check.type = 'checkbox';
        span.appendChild(check);
        checkspan.appendChild(span);
    }
    //add expense history
    setExpenseHistory();
}

//datalist wrong value error
let dinput = document.querySelector('#datagroup');
// console.log("dinput", dinput)
// When the value of the input changes…
dinput.addEventListener('change', function (e) {
    var optionFound = false,
        datalist = this.list;
    // console.log(datalist);
    // Determine whdether an option exists with the current value of the input.
    for (let j = 0; j < datalist.options.length; j++) {
        if (this.value == datalist.options[j].value) {
            optionFound = true;
            break;
        }
    }
    // use the setCustomValidity function of the Validation API
    // to provide an user feedback if the value does not exist in the datalist
    if (optionFound) {

        this.setCustomValidity('');
        currentGroup = this.value
        renderExpense(this.value);
    } else {
        this.setCustomValidity('Please select a valid value.');
        // console.log("option found");
    }
    e.preventDefault();
    // console.log("prevent default")
});

//addmember button to add 
addMember.addEventListener('click', (e) => {
    let inputs = document.querySelectorAll('#exampleModal .modal-body input');
    let mbody = document.querySelector('#exampleModal .modal-body');
    let mbutton = document.querySelector('#exampleModal .modal-body button');
    let filled = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {

            i == 0 ? alert('please fill group name') : alert('please fill member name');
            filled = false;
            break;
        }
    }
    // }
    // <div><span>Member 2: </span><input type="text"><br /></div><br/>
    if (filled) {
        let div = document.createElement('div');
        let span = document.createElement('span');
        span.innerText = "Member " + inputs.length + ": ";
        let input = document.createElement('input');
        input.type = "text";
        let br = document.createElement('br');
        div.appendChild(span);
        div.appendChild(input);
        mbody.insertBefore(div, mbutton);
        mbody.insertBefore(br, mbutton);
    }
    // console.log("button clicked!!! Add member");
});

//savechange to add group name
saveChange.addEventListener('click', (e) => {
    let inputs = document.querySelectorAll('#exampleModal .modal-body input');
    
    let filled = true;
    for (let i = 0; i < inputs.length; i++) {
        if (!inputs[i].value) {
            i == 0 ? alert('please fill group name') : alert('please fill member name');

            filled = false;
            break;
        }
    }

    if (filled) {

        let gname = inputs[0].value;

        let exgName = group.filter((item) => item.gname === gname);
        if (exgName.length === 0) {
            let member = [];
            for (let i = 1, j = 0; i < inputs.length; i++, j++) {
                member[j] = { name: inputs[i].value, mExpense: 0, tExpense: 0 };

            }
            let createGroup = {
                gname: gname,
                tExpense: 0,
                member: member,
                transaction: []
            }
            group.push(createGroup);
            localStorage.setItem('group', JSON.stringify(group));
            // console.log("button clicked!!!");
            let myModalEl = document.getElementById('exampleModal')
            let input = document.querySelectorAll('#exampleModal .modal-body input')

            let modal = bootstrap.Modal.getInstance(myModalEl);
            for (let i = 0; i < input.length; i++) {
                input[i].value = "";
            }
            let divs = document.querySelectorAll('#exampleModal .modal-body div')
            let brs = document.querySelector('#exampleModal .modal-body button')
            if (divs.length > 3) {
                for (let i = 3; i < divs.length; i++) {
                    divs[i].remove();
                }
                brs.previousElementSibling.remove();
            }
            // console.log(input)
            setOption();
            modal.toggle()


        }
        else {
            alert("Same group name already exist");

        }
    }


})

//Add New Expense
addExpensebutton.addEventListener('click', (e) => {
    let inputs = document.querySelectorAll('#expenseModal .modal-body input');
    // console.log(inputs);
    let filled = true;
    for (let i = 0; i < 3; i++) {
        if (!inputs[i].value) {
            i == 0 ? alert('please fill purpose') : i === 1 ? alert('please fill INR') : alert('please fill paid for');

            filled = false;
            break;
        }
    }
    // console.log(inputs[2].value);

    //numeric check
    if (isNaN(inputs[1].value) && filled) {
        filled = false;
        alert('enter only numeric value')
    }
    //validate paidfor
    let validpaidfor = [];
    let x = false;

    currentGroup ? validpaidfor = group.filter((item) => item.gname == currentGroup) : validpaidfor = [];
    x = validpaidfor[0].member.filter(item => item.name === inputs[2].value);
    // console.log(x);
    if (x.length == 0 && filled) {
        filled = false;
        alert('wrorng paid for name')
    }

    //atleast 1 checkbox should be filled in
    let check = 0;

    for (let i = 3; i < inputs.length; i++) {
        if (!inputs[i].checked) {
            check++;
        }
    }



    if (check == validpaidfor[0].member.length && filled) {
        filled = false;
        alert('select Atleast 1 member to procced')
    }
    if (filled) {
        let purpose = inputs[0].value;
        let expense = inputs[1].value;
        let paidby = inputs[2].value;
        let paidfor = [];
        let index = group.findIndex((item => item.gname == currentGroup));
        let debtter = 0;
        for (let i = 3, j = 0; i < inputs.length; i++, j++) {
            if (inputs[i].checked) {
                paidfor.push(validpaidfor[0].member[j].name)
                debtter++;
            }
        }
        for (let i = 3, j = 0; i < inputs.length; i++, j++) {
            // console.log("input check",inputs[i].checked,i);
            if (inputs[i].checked) {
                let ind = group[index].member.findIndex((item => item.name == validpaidfor[0].member[j].name));
                group[index].member[ind].tExpense = (Number(group[index].member[ind].tExpense) + Number(Number(inputs[1].value) / debtter)).toFixed(2);
                // console.log("for", group[index].member[ind].tExpense,group[index].member[ind].name);
                // console.log("debtter", debtter);
            }
        }
        // let debpaider = paidfor.includes(paidby);
        // if (debpaider) {
        let ind = group[index].member.findIndex((item => item.name == paidby));
        // console.log("ind---",ind,group[index].member);

        group[index].member[ind].tExpense = (Number(group[index].member[ind].tExpense) - Number(inputs[1].value)).toFixed(2);

        // console.log("personal",group[index].member[ind].tExpense,group[index].member[ind].name);

        // }{

        //         let ind = group[index].member.findIndex((item => item.name == paidby));
        //         console.log("texpense",Number(group[index].member[ind].tExpense));
        //         console.log("input Expense",Number(inputs[1].value));
        //         group[index].member[ind].tExpense =  (Number(group[index].member[ind].tExpense)-Number(inputs[1].value)).toFixed(2);

        // }
        let tr = {
            purpose: purpose,
            expense: expense,
            paidfor: paidfor,
            paidby: paidby
        }
        group[index].tExpense = Number(Number(group[index].tExpense) + Number(expense)).toFixed(2)
        group[index].transaction.push(tr);
        console.log(group[index])
        localStorage.setItem('group', JSON.stringify(group));
        let myModalEl = document.getElementById('expenseModal')
        let input = document.querySelectorAll('#expenseModal .modal-body input')
        let modal = bootstrap.Modal.getInstance(myModalEl);
        for (let i = 0; i < input.length; i++) {
            input[i].value = "";
            input[i].checked = false;
        }
        // console.log(input)

        setExpenseHistory();
        modal.toggle()
    }

})




console.log(JSON.parse(localStorage.getItem('group')))