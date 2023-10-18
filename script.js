document.addEventListener("DOMContentLoaded", function (){

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");
    const inputColor = document.querySelector(".input--color")
    const tools = document.querySelectorAll(".button--tool");
    const sizeButton = document.querySelectorAll(".button--size");
    const buttonClear = document.querySelector(".button--clear");
    
    let brushSize = 20;
    let isPainting = false
    let activeTool = "brush"
// desenhar
    inputColor.addEventListener("change" , ({target}) => {
        ctx.fillStyle = target.value;
    })

    canvas.addEventListener("mousedown", (Event) => {
        const{clientX, clientY} = Event
        isPainting = true
        if(activeTool == "brush"){
            draw(clientX, clientY)
        }
        if(activeTool == "rubber"){
            erase(clientX,clientY)
        }
    })

    canvas.addEventListener("mousemove", (Event) => {
        const{clientX, clientY} = Event
        if(isPainting){
            if(activeTool == "brush"){
                draw(clientX, clientY)
            }
        }
        if(activeTool == "rubber"){
            erase(clientX,clientY)
        }
    })
    canvas.addEventListener("mouseup", (Event) => {
      isPainting = false
    })
    const draw = (x, y) =>{
        ctx.globalCompositeOperation = "source-over"
        ctx.beginPath()
        ctx.arc(x - canvas.offsetLeft,y - canvas.offsetTop , brushSize / 2, 0, 2 * Math.PI)
        ctx.fill() 
    }
});
// desenhar

// apagar
const erase = (x, y) =>{
    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(
        x - canvas.offsetLeft,
        y - canvas.offsetTop,
        0, 2 * Math.PI
    )
    ctx.fill()
}

const selectTool = ({ target }) => {
    const selectedTool = target.closest("button")
    const action = selectedTool.getAttribute("data-action")

    if (action) {
        tools.forEach((tool) => tool.classList.remove("active"))
        selectedTool.classList.add("active")
        activeTool = action
    }
}

const selectSize = ({ target }) => {
    const selectedTool = target.closest("button")
    const size = selectedTool.getAttribute("data--size")

    sizeButtons.forEach((tool) => tool.classList.remove("active"))
    selectedTool.classList.add("active")
    brushSize = size
    sizeButtons.forEach((button) => {
        button.addEventListener("click", selectSize)
    })
    
    buttonClear.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    })
}
const tools = document.querySelectorAll(".button--tool");
tools.forEach((tool) => {
    tool.addEventListener("click", selectTool)
})

