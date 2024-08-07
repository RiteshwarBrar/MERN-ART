import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc } from 'firebase/firestore';

const AdditemForm = ({collectionRef, fetchPaintings}) => {
    
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [images, setImgs] = useState(null)
    const [price, setPrice] = useState('')
    const [forSale, setForSale] = useState(false)
    const [size, setSize] = useState('')
    const [medium, setMedium] = useState('')
    const [imageType, setImageType] = useState('Portrait')
    const imgs = []

    const handleSubmit = async(e) => {
        e.preventDefault()

        
        try{
            for (let i = 0; i < images.length; i++) {
            // Array.from(images).forEach(async (image) => {//fpr each file uploaded we store it in the data base and retrieve the download url
                const image = images[i];
                const storageRef = ref(storage, 'images/' + image.name);
                // console.log(storageRef)
                await uploadBytes(storageRef, image)
                const url = await getDownloadURL(storageRef) //getting the download url of the image
                imgs.push(url); //storing download url(s) in the imgs array
                // console.log(imgs);
                // console.log("///////////////////////");
            // });
            }
            
            // console.log(imgs);
            await addDoc(collectionRef, {
            Title:title, Date:date, Description:description, Images:imgs, Forsale:forSale, Price:price, Size:size, Medium:medium, Orientation:imageType
            });
            
            setError(null)
            setTitle('')
            setDate('')
            setDescription('')
            setImgs(null)
            setForSale(false)
            setPrice('')
            setSize('')
            setMedium('')
            setImageType('Portrait')
            imgs.length=0;
            console.log('Item added')
            // await dispatch({type: 'ADD_ITEM', payload: {Title:title, Date:date, Description:description}})
            fetchPaintings();
        }
        

        catch(err) {
            setError(err)
        }  
    }

    // const submitImgs = async(e) => {
    //        e.preventDefault()        
    //     try{

    //         Array.from(images).forEach((image) => {
    //             const storageRef = ref(storage, 'images/' + image.name);
    //             console.log(storageRef)
    //             uploadBytes(storageRef, image).then(() => {//uploading the image to the storage

    //                 getDownloadURL(storageRef)//getting the download url of the image
    //                     .then((url) => {
    //                         imgs.push(url)//storing multiple urls in the imgs array
    //                     });
    //               });
    //         });
            
    //         console.log(imgs);
    //         imgs.length=0;
    //         // console.log(Array.from(images))
    //         setError(null)
    //         // console.log(images[0].name)
    //         // await dispatch({type: 'ADD_ITEM', payload: {Title:title, Date:date, Description:description}})
    //         // fetchPaintings();
    //     }
        

    //     catch(err) {
    //         setError(err)
    //         setImgs(null)
    //     }  
    // }

    return (<div>
            {/* <img src="https://firebasestorage.googleapis.com/v0/b/online-store-aaf7c.appspot.com/o/images%2Ffbi.jpg?alt=media&token=8a09f702-28ba-4c22-a174-d29fe387fc76" alt='uploaded' />  */}
            <Form onSubmit={handleSubmit} className='add-item-form'>
                <Form.Group controlId='formTitle'>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formDate'>
                    <Form.Label>Date</Form.Label>
                    <Form.Control type='text' value={date} onChange={(e) => setDate(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formPrice'>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type='text' value={price} onChange={(e) => setPrice(e.target.value)} />
                </Form.Group>
                <div>-</div>
                <Form.Group controlId='formSold'>
                    <Form.Check type='checkbox' label='For Sale' onChange={(e) => setForSale(e.target.checked)} />
                </Form.Group>
                <div>-</div>
                <Form.Group controlId='formSize'>
                    <Form.Label>Size{" (dimensions)"}</Form.Label>
                    <Form.Control type='text' value={size} onChange={(e) => setSize(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formMedium'>
                    <Form.Label>Medium</Form.Label>
                    <Form.Control type='text' value={medium} onChange={(e) => setMedium(e.target.value)} />
                </Form.Group>
                <Form.Group controlId='formDescription'>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea"
                        rows={10}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}/>
                </Form.Group>
                <div>-</div>
                <Form.Group controlId='formUploadImg'>
                    <Form.Label>Upload Images</Form.Label>
                    <Form.Control type='file' multiple onChange={(e) => setImgs(e.target.files)} />
                </Form.Group>
                <div>-</div>
                <Form.Group controlId='formImageType'>
                <Form.Label>Image Type</Form.Label>
                    <Form.Control 
                        as='select' 
                        value={imageType} 
                        onChange={(e) => setImageType(e.target.value)}>
                        <option value='Portrait'>Portrait</option>
                        <option value='Landscape'>Landscape</option>
                        <option value='Square'>Square</option>
                    </Form.Control>
                </Form.Group>
                <div>-</div>
                {/* <Form.Group controlId='formUploadImg'>
                    <Form.Label>Upload Images</Form.Label>
                    <Form.Control type='file' multiple onChange={(e) => setImgs(e.target.files)} />
                </Form.Group> */}
                <Button type='submit'>Add Item</Button>
                {error && <p className='form-error'>{error}</p>}
                <div>-</div>
            </Form>
            </div>
    )
}

export default AdditemForm