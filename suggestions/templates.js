window.algorithmTemplates = {

    /* ---------------- C++ ---------------- */

    cpp: [
        {
            label: "bfs",
            detail: "Breadth-First Search",
            insertText: `queue<int> q;
vector<bool> visited(n, false);

q.push(\${1:start});
visited[\${1:start}] = true;

while(!q.empty()){
    int node = q.front();
    q.pop();

    for(auto next : adj[node]){
        if(!visited[next]){
            visited[next] = true;
            q.push(next);
        }
    }
}`
        },
        {
            label: "dfs",
            detail: "Depth-First Search",
            insertText: `void dfs(int node){
    visited[node] = true;

    for(auto next : adj[node]){
        if(!visited[next]){
            dfs(next);
        }
    }
}`
        },
        {
            label: "binarysearch",
            detail: "Binary Search",
            insertText: `int l = 0, r = n - 1;

while(l <= r){
    int mid = l + (r - l) / 2;

    if(arr[mid] == target){
        return mid;
    }

    if(arr[mid] < target){
        l = mid + 1;
    } else {
        r = mid - 1;
    }
}`
        },

        {
            label: "slidingwindow",
            detail: "Sliding Window",
            insertText:
                `int l = 0;
int sum = 0;

for(int r = 0; r < n; r++){

    sum += arr[r];

    while(sum > target){
        sum -= arr[l];
        l++;
    }

}`
        },

        {
            label: "twopointers",
            detail: "Two Pointers",
            insertText:
                `int l = 0, r = n-1;

while(l < r){

    if(condition){
        l++;
    } else {
        r--;
    }

}`
        }

    ],


    /* ---------------- PYTHON ---------------- */

    python: [

        {
            label: "bfs",
            detail: "Breadth-First Search",
            insertText:
                `from collections import deque

q = deque([\${1:start}])
visited = set([\${1:start}])

while q:
    node = q.popleft()

    for nxt in adj[node]:
        if nxt not in visited:
            visited.add(nxt)
            q.append(nxt)`
        },

        {
            label: "dfs",
            detail: "Depth-First Search",
            insertText:
                `def dfs(node):
    visited.add(node)

    for nxt in adj[node]:
        if nxt not in visited:
            dfs(nxt)`
        },

        {
            label: "binarysearch",
            detail: "Binary Search",
            insertText:
                `l, r = 0, len(arr) - 1

while l <= r:
    mid = (l + r) // 2

    if arr[mid] == target:
        return mid

    if arr[mid] < target:
        l = mid + 1
    else:
        r = mid - 1`
        },

        {
            label: "slidingwindow",
            detail: "Sliding Window",
            insertText:
                `l = 0
curr_sum = 0

for r in range(len(arr)):

    curr_sum += arr[r]

    while curr_sum > target:
        curr_sum -= arr[l]
        l += 1`
        },

        {
            label: "twopointers",
            detail: "Two Pointers",
            insertText:
                `l, r = 0, len(arr) - 1

while l < r:

    if condition:
        l += 1
    else:
        r -= 1`
        }

    ],


    /* ---------------- JAVA ---------------- */

    java: [

        {
            label: "bfs",
            detail: "Breadth-First Search",
            insertText:
                `Queue<Integer> q = new LinkedList<>();
boolean[] visited = new boolean[n];

q.add(\${1:start});
visited[\${1:start}] = true;

while(!q.isEmpty()){

    int node = q.poll();

    for(int next : adj.get(node)){

        if(!visited[next]){
            visited[next] = true;
            q.add(next);
        }

    }

}`
        },

        {
            label: "dfs",
            detail: "Depth-First Search",
            insertText:
                `void dfs(int node){

    visited[node] = true;

    for(int next : adj.get(node)){

        if(!visited[next]){
            dfs(next);
        }

    }

}`
        },

        {
            label: "binarysearch",
            detail: "Binary Search",
            insertText:
                `int l = 0, r = arr.length - 1;

while(l <= r){

    int mid = l + (r - l)/2;

    if(arr[mid] == target){
        return mid;
    }

    if(arr[mid] < target){
        l = mid + 1;
    } else {
        r = mid - 1;
    }

}`
        },

        {
            label: "slidingwindow",
            detail: "Sliding Window",
            insertText:
                `int l = 0;
int sum = 0;

for(int r = 0; r < arr.length; r++){

    sum += arr[r];

    while(sum > target){
        sum -= arr[l];
        l++;
    }

}`
        },

        {
            label: "twopointers",
            detail: "Two Pointers",
            insertText:
                `int l = 0, r = arr.length - 1;

while(l < r){

    if(condition){
        l++;
    } else {
        r--;
    }

}`
        }

    ]

};
window.cppSnippets = [
    {
        label: "fori",
        insertText: `for(int i = 0; i < \${1:n}; i++){
    \${2}
}`
    },

    {
        label: "forj",
        insertText: `for(int j = 0; j < \${1:n}; j++){
    \${2}
}`
    },

    {
        label: "vector",
        insertText: "vector<int>"
    },
    {
        label: "stack",
        insertText: "stack<int>"
    },
    {
        label: "queue",
        insertText: "queue<int>"
    },
    {
        label: "map",
        insertText: "map<int,int>"
    },


    {
        label: "pq",
        insertText: "priority_queue<int>"
    },

    {
        label: "pair",
        insertText: "pair<int,int>"
    },

    {
        label: "fastio",
        insertText: `ios::sync_with_stdio(false);
cin.tie(NULL);`
    },

    {
        label: "ifelse",
        insertText: `if(\${1:condition}){

}else{

}`
    },

    {
        label: "main",
        insertText: `int main(){
    \${1}
    return 0;
}`
    }
];
