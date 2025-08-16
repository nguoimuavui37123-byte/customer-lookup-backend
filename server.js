const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

let customers = [
    { phone: '0123456789', name: 'Nguyễn Văn A', address: 'Hà Nội', email: 'a@gmail.com', avatar: '', social: { zalo: '', facebook: '' } }
];

async function onlineLookup(phone) {
    if (phone === '0987654321') {
        return {
            phone,
            name: 'Trần Thị B',
            address: 'TP.HCM',
            email: 'b@gmail.com',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            social: {
                zalo: 'https://zalo.me/0987654321',
                facebook: 'https://facebook.com/0987654321'
            }
        };
    }
    return null;
}

app.get('/customer/:phone', async (req, res) => {
    let result = customers.find(c => c.phone === req.params.phone);
    if (!result) {
        result = await onlineLookup(req.params.phone);
        if (!result) return res.json({ found: false });
    }
    res.json({ found: true, customer: result });
});

app.post('/customer', (req, res) => {
    const { phone, name, address, email, avatar, social } = req.body;
    if (customers.find(c => c.phone === phone)) {
        return res.status(400).json({ message: 'Khách hàng đã tồn tại!' });
    }
    const newCustomer = { phone, name, address, email, avatar, social };
    customers.push(newCustomer);
    res.json({ success: true, customer: newCustomer });
});

app.listen(process.env.PORT || 10000, () => console.log('API server running'));
