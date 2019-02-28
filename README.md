# servicearea
run the following commands
npm install express
npm install mongoose
npm install body-parser


On the first page the application allows the user to create a service area, delete(by selecting the polygon) the service area.
The user can stretch the corners of the polygon while creating it.
To draw the polygons select the draw icon(upper-left corner), hand-cursor icon to navigate and zoom the map.
The user can view already created service areas (in red shade).
The user can view the co-ordinates of any polygon drawn on the map,by clicking on it.

On the second page the user can click anywhere on the map.If the lat and longitude is within any area a blue triangle will appear with
an info window,showing the co-ordinates and the name of the service area.If it doesnt match a red circle is shown.


API created
saveServiceArea: To get save the created service area
getServiceAreas : To get all the service areas
checkServiceArea : To check whether a location falls in the bounding box or not. (checked from backend as well as from localstorage)
