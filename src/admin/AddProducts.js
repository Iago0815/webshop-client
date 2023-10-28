import React, {useState, useEffect} from "react";
import Layout from "../pages/Layout";
import { isAuthenticated } from "../auth";
import { createdProduct, getCategories } from "./apiAdmin";


const AddProduct = () => {
   
    const [values,setValues] = useState({

        name: '',
        description:'',
        price:'',
        categories:[],
        category:'',
        shipping:'',
        quantity:'',
        photo:'',
        loading:false,
        error:'',
        createdProd:'',
        redirecToProfile:false,
        formData:''
    })


     const {user,token} = isAuthenticated();

    const {name, description, price, categories, category, shipping, quantity,
    loading, error, createdProd, formData} = values;

    // load categories and set form data
    const init = () =>  {

        getCategories().then(data => {

            if(data.error) {

               setValues({...values, error:data.error})
            }  else {

               setValues({...values, categories: data, formData: new FormData() })
            }

        })

       console.log(categories);
    }

    //useEffect runs when the component mounts and anytime there is a change
    //in the state
   
    useEffect(()=> {
        init();     

    },[])

     // fromData: when the handelChange happens, we do not only want to change the 
    // state but we also wanto update the formData as well.

    const handleChange = name => event => {

        const value = name === 'photo' ? event.target.files[0] : event.target.value
        formData.set(name,value);

       setValues({...values, [name]:value})
    }

    const clickSubmit = (e) => {

         e.preventDefault();
         setValues({...values, error:'',loading:true});

         createdProduct(user._id,token,formData).then(data => {

            if(data.error) {

            setValues({...values,error:data.error}) 
            }
            else {

                setValues({...values,
                    name: '',
                    description:'',
                    photo:'',
                    price:'',
                    quantity:'',
                    loading:false,
                    createdProd: data.name
                })
            }
         })

    }

    const newPostForm = () => (

        <form className="mb-5" onSubmit={clickSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">

                <label className="btn btn-secondary">
                <input onChange={handleChange("photo")} type="file" name="photo" accept="image/*"/>
                </label>
            </div>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" value={name}
                onChange={handleChange("name")}/>


            </div>
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea className="form-control" value={description}
                onChange={handleChange("description")}/>


            </div>

            <div className="form-group">
                <label className="text-muted">Price</label>
                <input type="number" className="form-control" value={price}
                onChange={handleChange("price")}/>
            </div>

            
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select type="number" className="form-control" value={category}
                onChange={handleChange("category")}>

            
                <option>Please select</option>
                 { categories && categories.map((c,i)=> 

                   <option key={i} value={c._id}>{c.name}</option>
                 )}

                </select>
            </div>

              <div className="form-group">
                <label className="text-muted">Shipping</label>
                <select type="number" className="form-control" value={shipping}
                onChange={handleChange("shipping")}>

                      <option>Please select</option>
                    <option value="0">No</option>
                    <option value="1">Yes</option>
                </select>
            </div>


            
            <div className="form-group">
                <label className="text-muted">Quantity</label>
                <input type="number" className="form-control" value={quantity}
                onChange={handleChange("quantity")}/>
            </div>
            <button className="btn btn-outline-primary">Create Product</button>

        </form>
    );

    const showError = () => (

        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>

            {error}
        </div>
    )

     const showSuccess = () => (

        <div className="alert alert-info" style={{display: createdProd ? '' : 'none'}}>

          <h2>{`${createdProd} `}is created</h2>
        </div>
    )

        const showLoading = () => (

       loading && (<div className="alert alert-success">

        <h2>Loading...</h2>
       </div>)
    )



     return (   <Layout title="Add a new product" 
                description={`Hello ${user.name}!`} 
               >
           

        <div className='row'>
           <div className="col-md-8 offset-md-2">

                {showLoading()} 
                {showError()}
                {showSuccess()}

               { newPostForm()}
            </div>
        </div>

        </Layout>);

}

export default AddProduct;
