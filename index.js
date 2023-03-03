let myleads=[]
const button_id=document.getElementById('input-btn')
const input_text=document.getElementById('input-El')
const deleteBtn=document.getElementById('delete-btn')
const deleteall=document.getElementById('delete-all')
const tabBtn=document.getElementById('save-tab')
const ULEL=document.getElementById('ul-el')

const leads_from_local_storage=JSON.parse(localStorage.getItem("myleads"))

tabBtn.addEventListener("click",function(){
    console.log("Button clicked")
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // use `url` here inside the callback because it's asynchronous!
        console.log(tabs[0].url)
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        ULEL.innerHTML=""
        lead_Extension(myleads)
    });
    
})

if(leads_from_local_storage){
    myleads=leads_from_local_storage
    lead_Extension(myleads)
}

button_id.addEventListener("click",function(){
    myleads.push(input_text.value)
    ULEL.innerHTML=""
    input_text.value=""
    localStorage.setItem("myleads",JSON.stringify(myleads))
    ULEL.innerHTML=""
    lead_Extension(myleads)
})

deleteBtn.addEventListener("dblclick",function(){
    myleads.pop()
    localStorage.setItem("myleads",JSON.stringify(myleads))
    ULEL.innerHTML=""
    lead_Extension(myleads)
})

deleteall.addEventListener("dblclick",function(){
    console.log("Deleted all")
    localStorage.clear()
    myleads.clear()
    myleads=[]
    lead_Extension(myleads)
})

function lead_Extension(leads){
    let Items=""
    for(let i=0;i<leads.length;i++){
        Items+=`
        <li>
            <a target='__blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>`
    }
    ULEL.innerHTML+=Items
}