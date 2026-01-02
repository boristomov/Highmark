# Highmark Rentals - Products

## Replace existing product images with your chairs images

1) Place your chair images here:

`public/images/boris/rental_equipment/chairs`

Supported: jpg, jpeg, png, webp, avif

2) Run the replacer to keep current products but swap their images:

```bash
npm run replace:product-images
```

This assigns images from the chairs folder to each product in order, setting both `proImg` and `psImg`.

If changes don’t appear immediately in dev, restart `npm run dev` or refresh the page.
