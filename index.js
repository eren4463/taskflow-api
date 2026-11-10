const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// 1. TEMEL MIDDLEWARE: LOGGER
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} isteği geldi -> Endpoint: ${req.url}`);
    next(); 
});

// VERİTABANI
let tasks = []; 
let idCounter = 1;

// 2. CRUD İŞLEMLERİ

// Görev Ekleme (POST)
app.post('/tasks', (req, res) => {
    const { title, description, priority, assignee } = req.body;
    const newTask = {
        id: idCounter.toString(), 
        title: title || "İsimsiz Görev",
        description: description || "",
        status: "todo", 
        priority: priority || "medium",
        assignee: assignee || "Atanmadı",
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask); 
    idCounter++; 
    res.status(201).json({ message: "Görev başarıyla oluşturuldu", task: newTask });
});

// Tüm Görevleri Listeleme, Arama, Filtreleme ve Sayfalama (GET)
app.get('/tasks', (req, res) => {
    let result = tasks; 

    // 1. ARAMA (Search) - Başlık veya açıklamada kelime arama
    if (req.query.search) {
        const searchStr = req.query.search.toLowerCase();
        result = result.filter(task => 
            task.title.toLowerCase().includes(searchStr) || 
            task.description.toLowerCase().includes(searchStr)
        );
    }

    // 2. FİLTRELEME (Filter) - Durum (status) veya önceliğe (priority) göre
    if (req.query.status) {
        result = result.filter(task => task.status === req.query.status);
    }
    if (req.query.priority) {
        result = result.filter(task => task.priority === req.query.priority);
    }

    // 3. SAYFALAMA (Pagination) - Sayfa numarası ve limit belirleme
    if (req.query.page || req.query.limit) {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        
        const paginatedResult = result.slice(startIndex, endIndex);
        
        return res.status(200).json({
            toplamGorev: result.length,
            mevcutSayfa: page,
            toplamSayfa: Math.ceil(result.length / limit),
            data: paginatedResult
        });
    }

    // Eğer hiçbir arama/filtre yoksa tüm listeyi dön
    res.status(200).json(result);
});
// Görev Güncelleme (PUT)
app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) return res.status(404).json({ message: "Görev bulunamadı" });
    
    const { title, description, status, priority, assignee } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.assignee = assignee || task.assignee;
    
    res.status(200).json({ message: "Görev başarıyla güncellendi", task });
});

// Görev Silme (DELETE)
app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) return res.status(404).json({ message: "Görev bulunamadı" });
    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: "Görev başarıyla silindi" });
});

// Test Rotası
app.get('/', (req, res) => {
    res.send('TASKFLOW API Başarıyla Çalışıyor!');
});

app.listen(PORT, () => {
    console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});