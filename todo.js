let myNodelist = document.getElementsByTagName('LI');
let close = document.getElementsByClassName('close');
let index_elem = -1;
let arr = [];
let itemsArray = [];
let flagStorege = false;
let list = document.querySelector('ul');
closeEl();
if (localStorage.length > 0) {
  flagStorege = true;
  let locArr = JSON.parse(localStorage.getItem('key'));     
  arr = [...locArr];
  newElement();
}  

for (let i = 0; i < myNodelist.length; i++) {
  let span = document.createElement('SPAN');
  let txt = document.createTextNode('\u00D7');
  span.className = 'close';
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

list.addEventListener('click', function(ev) { 
  ev.target.classList.toggle('checked');
  const el = ev.target
  if (ev.target === 'checked') {  
    if (arr[el.id].complit) {
      arr[el.id].complit = false;  
      } else {
        arr[el.id].complit = true;
      }
  }
}, false);

function newElement () {
  if (flagStorege) {
    const checLok = JSON.parse(localStorage.getItem('key'));
    if (checLok.length) {      
      index_elem = checLok.length;
      checLok.forEach( el => {
        let li = document.createElement('li');
        li.id = `${el.index}`;
        let inputValue = el.text;
        let t = document.createTextNode(inputValue);
        li.appendChild(t);
        document.getElementById('myUL').appendChild(li);
        let span = document.createElement('SPAN');
        let txt = document.createTextNode('\u00D7');
        span.className = 'close';
        span.appendChild(txt);
        li.appendChild(span);     
        flagStorege = false;
        itemsArray.push(arr[el.index]);
        
      });
      closeEl();
    }    
  } else {
    ++index_elem;   
    let li = document.createElement('li');
    li.id = `${index_elem}`;
    let inputValue = document.getElementById('myInput').value;
    let t = document.createTextNode(inputValue);
    li.appendChild(t);

    if (inputValue === '') {
      alert('Вы должны что-то написать!');
    } else {      
      document.getElementById('myUL').appendChild(li);
      }
    arr[index_elem]={
      index:index_elem,
      text:inputValue,
      complit:false,
    };

    itemsArray.push(arr[index_elem]);       
    localStorage.setItem('key', JSON.stringify(itemsArray)); 

    document.getElementById('myInput').value = '';    
    let span = document.createElement('SPAN');
    let txt = document.createTextNode('\u00D7');
    span.className = 'close';
    span.appendChild(txt);
    li.appendChild(span);
    
    closeEl();
  }
}
function closeEl () {
  let itemsArrayClear = [];
    for (let i = 0; i < close.length; i++) {
        close[i].onclick = function() {
          --index_elem;
          arr.splice(i,1);
          for (let j=0; j < arr.length; j++) {            
            arr[j].index = j; 
            itemsArrayClear.push(arr[j]);            
          } 
                            
          if (arr.length) {                               
            localStorage.setItem('key', JSON.stringify(itemsArrayClear));
          }          
          let div = this.parentElement;
          div.remove();       
        }           
      }
  itemsArrayClear = [];
}
function showDone () {
  let ids = [];
  if (arr.length === 0) {
    return;
  } else {
      ids = arr.filter(a => !a.complit).map(a => a.index);
    }      
  ids.forEach(id => {
  const a = document.getElementById(id); 
  a.classList.add('displ-none');
  });
closeEl();
}

function showWork () {
  let ids = []
  if (arr.length === 0) {
    return;
  } else {
      ids = arr.filter(a => a.complit).map(a => a.index);  
      ids.forEach(id => {
      const a = document.getElementById(id);
      a.classList.add('displ-none');
      })  
    }
closeEl();
}

function showAll () {
  let ide_local = []
  if (arr.length === 0) {
    return;
  } else {   
      const newArray = [...arr]; 
      ide_local = newArray.map(el => el.index);    
      ide_local.forEach((id) => {     
        const a = document.getElementById(id);        
        if (a.classList.contains('displ-none')) {
          a.classList.remove('displ-none');
        }
      });  
    }
closeEl();
}
