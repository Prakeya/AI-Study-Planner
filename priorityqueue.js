class PriorityQueue {
    constructor() {
        this.heap = [];
    }

    push(task) {
        this.heap.push(task);
        this.bubbleUp();
    }

    pop() {
        if (this.size() === 0) return null;
        const top = this.heap[0];
        const last = this.heap.pop();
        if (this.size() > 0) {
            this.heap[0] = last;
            this.bubbleDown();
        }
        return top;
    }

    size() {
        return this.heap.length;
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            let parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].score <= this.heap[parentIndex].score) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let swap = null;

            if (leftChildIndex < length) {
                if (this.heap[leftChildIndex].score > this.heap[index].score) {
                    swap = leftChildIndex;
                }
            }

            if (rightChildIndex < length) {
                if (
                    (swap === null && this.heap[rightChildIndex].score > this.heap[index].score) ||
                    (swap !== null && this.heap[rightChildIndex].score > this.heap[leftChildIndex].score)
                ) {
                    swap = rightChildIndex;
                }
            }

            if (swap === null) break;
            [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
            index = swap;
        }
    }
}

const pq = new PriorityQueue();

function addTask() {
    const name = document.getElementById("taskName").value;
    const deadline = document.getElementById("deadline").value;
    const importance = parseInt(document.getElementById("importance").value);

    if (!name || !deadline || isNaN(importance)) {
        alert("Please fill all fields");
        return;
    }

    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDiff = (deadlineDate - now) / (1000 * 60 * 60); // hours

    // Higher importance and closer deadline = higher priority score
    // Score formula: (Importance * 10) - (Hours until deadline / 10)
    const score = (importance * 10) - (timeDiff / 10);

    pq.push({ name, deadline, importance, score });
    updateTaskList();

    // Clear inputs
    document.getElementById("taskName").value = "";
    document.getElementById("deadline").value = "";
    document.getElementById("importance").value = "";
}

function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    // Create a copy of the heap to display in order
    const displayHeap = [...pq.heap].sort((a, b) => b.score - a.score);

    displayHeap.forEach(task => {
        const div = document.createElement("div");
        div.className = "task-card";
        
        const deadlineDate = new Date(task.deadline);
        const formattedDate = deadlineDate.toLocaleString();

        div.innerHTML = `
            <strong>${task.name}</strong> (Importance: ${task.importance})
            <div class="deadline">Deadline: ${formattedDate}</div>
            <div class="countdown">Priority Score: ${task.score.toFixed(2)}</div>
        `;
        taskList.appendChild(div);
    });
}
