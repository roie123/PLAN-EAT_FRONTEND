import * as React from 'react';
// import AspectRatio from '@mui/joy/AspectRatio';
// import Box from '@mui/joy/Box';
// import Typography from '@mui/joy/Typography';
// import Card from '@mui/joy/Card';

// import Recipe from '../MODELS/Recipe';
// import { useEffect } from 'react';
// import './RecipeCarStyle.css'

// interface PropsForCar{
//   recipesToRender :Recipe[]
// }
// export default function CarouselRatio(propsForCar:PropsForCar) {

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         gap: 1,
//         py: 1,
//         overflow: 'auto',
//         width: '90%',
//         scrollSnapType: 'x mandatory',
//         '& > *': {
//           scrollSnapAlign: 'center',
//         },
//         '::-webkit-scrollbar': { display: 'none' },
//       }}
//     >
//       {propsForCar.recipesToRender.map((item) => (
//         <Card
          
//           key={item.id}
//           variant="outlined"
//           sx={{
//             gap: 2,
//             '--Card-padding': (theme) => theme.spacing(2),
//             width:'30vh',
//             height:'70vh'
//           }}
//         >
//           <AspectRatio ratio="1" sx={{ minWidth: 60 }}>
//             <div className='img-cont' style={{width:'45vh' , height:'45vh' , marginRight:'auto', marginLeft:'auto', backgroundColor:'black' }}>
//             <img
//               style={{width:'100%', height:'100%', objectFit:'cover'}}
//               src={item.imgUrl}
//               // srcSet={`${item.imgUrl}?h=120&fit=crop&auto=format&dpr=2 2x`}
//               alt={item.name}
//             />
//             </div>
//           </AspectRatio>
//           <Box sx={{  textAlign:'center' }}>
//             <Typography fontWeight="md"  noWrap   sx={{ height:'20vh' ,overflowWrap: "break-word"}} >{item.name}</Typography>
//             <Typography level="body2">{item.estimatedPrice.toPrecision(3)}$</Typography>
//           </Box>
//           <button className='main-button'>CHOOSE A TIME</button>

//         </Card>
//       ))}
//     </Box>
//   );
// }