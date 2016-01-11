# automatic database population script
echo "SCRIPT: Starting automatic database population"

# populate user database
for i in `seq 1 5`;
do
	echo "SCRIPT: Starting user database population run $i"
	node populateuser.js
done  
echo "SCRIPT: User database population complete"

# populate business database
for i in `seq 1 5`;
do
	echo "SCRIPT: Starting business database population run $i"
	node populatebusiness.js
done  
echo "SCRIPT: Business database population complete"

# populate user images
for i in `seq 1 5`;
do
	echo "SCRIPT: Starting user image population run $i"
	node userimage.js
done  
echo "SCRIPT: User image population complete"

# populate business images
for i in `seq 1 5`;
do
	echo "SCRIPT: Starting business image population run $i"
	node businessimage.js
done  
echo "SCRIPT: Business image population complete"

# generate random participation
echo "SCRIPT: Generating random participation"
node participator.js
echo "SCRIPT: Participation population complete"

echo "SUCCESS: Population complete, please check database to ensure data integrity"

