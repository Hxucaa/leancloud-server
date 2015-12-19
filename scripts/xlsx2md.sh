#!/usr/bin/env bash
# Use > 1 to consume two arguments per pass in the loop (e.g. each
# argument has a corresponding value to go with it).
# Use > 0 to consume one or more arguments per pass in the loop (e.g.
# some arguments don't have a corresponding value to go with it such
# as in the --default example).
# note: if this is set to > 0 the /etc/hosts part is not recognized ( may be a bug )
while [[ $# > 1 ]]
do
key="$1"

case $key in
    -i|--input)
    INPUT="$2"
    shift # past argument
    ;;
    -o|--output)
    OUTPUT="$2"
    shift # past argument
    ;;
    *)
            # unknown option
    ;;
esac
shift # past argument or value
done

python3 xlsx_to_csv.py "${INPUT}" temp.csv
python3 csv_to_md.py temp.csv > "${OUTPUT}"
cat "${OUTPUT}" | pbcopy
rm -f temp.csv

if [ $? -eq 0 ]; then
    echo "Successfully write to file: ${OUTPUT}"
    echo "Successfully copy to clipboard."
else
    echo "Command failed!"
fi
