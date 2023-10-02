[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/_IojtdoU)
# StackIt Hiring Assignment

### Welcome to StackIt's hiring assignment! 🚀

**If you didn't get here through github classroom, are you sure you're supposed to be here? 🤨**


We are glad to have you here, but before you read what you're going to beat your head over for the next few hours (maybe days?), let's get a few things straight:
- We really appreciate honesty. Don't copy anyone else's assignment, it'll only sabotage your chances :P
- You're free to use any stack, and library of your choice. Use whatever you can get your hands on, on the internet!
- We love out of the box solutions. We prefer to call it *Jugaad* 
- This might be just the first round, but carries the most importance of all. Give your best, and we hope you have a fun time solving this problem.

## ✨ **Problem Statement: Crafting a CSV Importer for Google Sheets** ✨

**Context**:
Data analysts around the world 🌍, handle massive amounts of data to derive meaningful insights for their organization 📊. Among the tools they use, Google Sheets 📈 stands out due to its ease of use, accessibility, and collaborative features. However, many analysts have identified a recurring pain point: the cumbersome process of importing CSV files into Google Sheets repeatedly.

A typical week of an analyst in an e-commerce company 🛒 involves receiving multiple CSV files 📁 containing sales, inventory, customer feedback, and more. The data from these files needs to be meticulously analyzed and presented in the company’s weekly meetings. However, instead of diving directly into analysis, most analysts need to spend an inordinate amount of time just importing and structuring these CSV files into Google Sheets ⏳. This repetitive, time-consuming task reduces the efficiency of these professionals and delays the extraction of crucial insights 😫.

**Today, you are going to make their lives better.**

**Problem Statement**:
Make a CSV Importer for Google Sheets that lets users drag and drop CSV files onto the Google Sheet. The moment they drop the CSV file, allow them to select which columns to import 🗂️.

You get brownie points 🍪 if you can make it even easier by allowing them to filter the data as well before importing it into Google Sheets 🔍.

**Other pointers**:
- Import to Sheet – After validation and mapping, devise a method to populate the data into a chosen Google Sheet, either appending to existing data or creating a new sheet 📥📋.
- Optimize for Large Files – Large datasets are common in analytics. Your solution should effectively handle large CSV files (~15MB CSV file) without causing performance issues or prolonged waiting times 📈📦.

## Submission ⏰
The timeline for this submission is: **9AM, 30th Sept, 2023 - 12PM, 2nd Oct, 2023**

Some things you might want to take care of:
- Make use of git and commit your steps!
- Use good coding practices.
- Write beautiful and readable code. Well-written code is nothing less than a work of art.
- Use semantic variable naming.
- Your code should be organized well in files and folders which is easy to figure out.
- If there is something happening in your code that is not very intuitive, add some comments.
- Add to this README at the bottom explaining your approach (brownie points 😋)

Make sure you finish the assignment a little earlier than this so you have time to make any final changes.

Once you're done, make sure you **record a video** showing your project working. The video should **NOT** be longer than 120 seconds. While you record the video, tell us about your biggest blocker, and how you overcame it! Don't be shy, talk us through, we'd love that.

We have a checklist at the bottom of this README file, which you should update as your progress with your assignment. It will help us evaluate your project.

- ✅ My code's working just fine! 🥳
- ✅ I have recorded a video showing it working and embedded it in the README ▶️
- ✅ I have tested all the normal working cases 😎
- ✅ I have even solved some edge cases (brownie points) 💪
- ✅ I added my very planned-out approach to the problem at the end of this README 📜

## Got Questions❓
Feel free to check the discussions tab, you might get something of help there. Check out that tab before reaching out to us. Also, did you know, the internet is a great place to explore 😛

## Developer's Section
*Add your video here, and your approach to the problem (optional). Leave some comments for us here if you want, we will be reading this :)*

### Video Demo
https://github.com/StackItHQ/stackit-hiring-assignment-buzo1234/assets/44663554/c05ee3d7-cd5f-46a3-bacf-9f7187eb86f2


**Personal note at last**

### Approach
Let's divide the problem statement into four different parts.
1. Authentication
2. CSV file parsing
3. Sorting and Filtering
4. Selecting sheet and Import

#### Authentication
- We need to know user's authenticity, as we need their consent to view and modify their spreadsheets.
- We will use Google OAuth for this with the following scopes.
    1. https://www.googleapis.com/auth/spreadsheets,
    2. https://www.googleapis.com/auth/drive.file,
    3. https://www.googleapis.com/auth/drive,

##### Explainer diagram
![Google OAuth](https://media.geeksforgeeks.org/wp-content/uploads/20220111131226/Screenshot20220111131209-660x477.png)

#### CSV file parsing and Column selection
- Next, we need to gather information about our CSV files.
- We can use FileReaders to read our CSV.
- Information collected will be.
    1. Headers (First line of CSV)
    2. Entire CSV in a string format (Useful in batch updating google sheets)

For this I wil be utilizing a npm module called **PapaParser**

##### Step screenshot
![Column selection](/images/column-selection.png)

#### Sorting and Filtering
- Now, we need to give users and extra level of comfort by including an option to filter and/or sort their csv data.
- Sorting specifications may include
    1. Asceding sort
    2. Descending sort
- Filtering criterias may include
    1. Number greater than
    2. Number less than
    3. Number equal to
    4. Number less than and equal to
    5. Number greater than and equal to
    6. Number between
    7. Text contains
    8. Text starts with
    9. Text ends with ...and many more.

- This part made me focus majorly on the documentaion of google sheets api.
- All the queries will be under **batchUpdate** and subsequent requests for each of the sorting specifications and filtering criterias will be appended in the final request.
- API calls will only be made in the final(4th) step.

##### Step screenshot
![Filtering and Sorting](/images/filtering.png)

#### Selecting sheet and Import
- Furthermore, we need to give option to the user for selecting exactly where the CSV has to imported.
- We can unique identity someone's sheet using two values, SpreadSheetID and SheetID.
- Now that we have that details, we can import the csv into the correct spreadsheet.


#### Sheets API
###### Following is the layout of data we pass to the google sheets api.

We are using batchUpdate query for this.
```json
{
    "spreadsheetId": <Users's spreadsheet ID>,
    "resource" : {
        "includeSpreadsheetInResponse": true,
        "request":[
            /* Clear initial filter on the sheet */
            {
                "clearBasicFilter": {
                    "sheetId": <Users's sheet ID>
                }
            },

            /* Paste data in sheets using csv data's string */
            {
                "pasteData":{
                    "coordinate":{
                        "columnIndex": 0,
                        "rowIndex":0,
                        "sheetId": <User's sheet ID>
                    },
                    "delimiter": ",",
                    "type": "PASTE_NORMAL",
                    "data": <String from CSV file>
                }
            },

            /* Applying sorting specifications */
            {
                "sortRange":{
                    "range":{
                        "sheetId":<User's sheet ID>,
                        "startRowIndex": 1,
                        "startColumnIndex": 0,
                    },
                    "sortSpecs": [
                        /* Array of sorting criterias */
                        {
                            "sortOrder": "ASCENDING/DESCENDING",
                            "dimensionIndex": <Column Index>
                        }
                    ]
                }
            },

            /* Applying filters */
            {
                "setBasicFilter": {
                    "filter":{
                        "range":<Sheet range>,
                        "filterSpecs": [
                            /* Array of all filter specs */
                            {
                               "filterCriteria":{
                                "condition":{
                                    "type":<Condition Type>,
                                    "value":[
                                        /* Array of string values */
                                    ]
                                }
                               } 
                            }
                        ]
                    }
                }
            },

            /* Deleting columns that are unmarked */
            /* We need to keep decrementing the column index of the unselected ones after one column is deleted */
            {
                "deleteDimension":{
                    "range":{
                        "dimension": "ROWS/COLUMNS",
                        "startIndex": <Column index>,
                        "endIndex": <Column Index + 1>
                    }
                }
            }
        ]
    }
}
```

### Personal Note
I wanted to share that I, too, have a deep passion for entrepreneurship. Over the years, I've cultivated my skills and honed my ability to identify opportunities, take calculated risks, and bring creative ideas to life. I believe that entrepreneurship is not just about building businesses but also about making a meaningful difference in the world.

The values and vision of Stackit resonate strongly with me, and I would love the opportunity to work with you guys in the future. Whether it's through internship, mentorship, or any other form of engagement, I am eager to contribute my entrepreneurial mindset and expertise to support your journey.

Thank you for inspiring me with your work, and I look forward to the possibility of joining forces to create something remarkable together.

[![Linkedin](https://i.stack.imgur.com/gVE0j.png) LinkedIn](https://www.linkedin.com/in/karandua2002/)
&nbsp;
[![GitHub](https://i.stack.imgur.com/tskMh.png) GitHub](https://github.com/buzo1234)
