```
GET /items -> List all the items in JSON.

GET /items/:id -> Returns the book for the given ID

POST /items/ -> Create book.

PUT /items/:id -> Update book.
```

```
ITEM:
	id: STR,
	text: TEXT,
	gif: {
		src: STR,
		width: NUM,
		height: NUM,
	}
```