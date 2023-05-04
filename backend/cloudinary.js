const cloudinary = require ("cloudinary").v2;

const dotenv = require("dotenv");
// const fs = require ("fs");
dotenv.config();


// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


  // exports.clouduploads = async (files, folder) => {
  //   const uploadResults = [];
  
  //   for (const file of files) {
  //     const uploadResult = await new Promise((resolve) => {
  //       const uploadStream = cloudinary.uploader.upload_stream(
  //         {
  //           resource_type: "auto",
  //           folder: folder,
  //         },
  //         (error, result) => {
  //           if (error) {
  //             console.log(error);
  //             resolve({ error });
  //           } else {
  //             resolve({
  //               url: result.url,
  //               id: result.public_id,
  //             });
  //           }
  //         }
  //       );
  
  //       const stream = fs.createReadStream(file.path);
  //       stream.pipe(uploadStream);
  //     });
  
  //     uploadResults.push(uploadResult);

  //     fs.unlink(file.path, (err) => {
  //       if (err) {
  //         console.error(err);
  //       }
  //     });
  //   }
    
  //   return uploadResults.map(({url, id}) => ({url, id}));
  // };
  

  exports.clouduploads = async (files, folder) => {
    const uploadResults = [];
  
    for (const file of files) {
      try {
        const result = await cloudinary.uploader.upload(file.buffer, {
          resource_type: 'auto',
          folder: folder
        });
        uploadResults.push({ url: result.url, id: result.public_id });
        // fs.unlink(file.path, (err) => {
        //   if (err) {
        //     console.error(err);
        //   }
        // });
      } catch (error) {
        console.error(error);
        throw new Error('Upload failed');
      }
    }
  
    return uploadResults;
  };