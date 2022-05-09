function send_slack_message() {
  var file_id = '<file_id>'
  var sheet = SpreadsheetApp.openById(file_id);

  var target_values = sheet.getDataRange().getValues();
  range = 'A1:P' + target_values.length.toString();
  Logger.log(range);

  sheet.getRange(range).getValues().forEach((row, index) => {
    if(row[12] != "" && row[15] == "DONE"){
        //do nothing
    }
    if(row[12] != "" && row[15] == ""){
         Logger.log(row);
         target_values[index][15] = "DONE";
    }
    else if(row[12] == "" && row[15] == ""){
         Logger.log(row);
         target_values[index][15] = "SENT";
         send_message(row, false);
    }else if(row[12] == "" && row[15] == "SENT"){
      //provjeri je li rok za tjedan dana
      var deadline = new Date(row[9]);
      var current_date = new Date();
      var temp_date = new Date();
      temp_date.setDate(temp_date.getDate() + 7);

      Logger.log(deadline.toString());
      Logger.log(temp_date.toString());
      if(current_date > deadline){
        target_values[index][15] = "DONE";
      }
      else if(temp_date >= deadline){
        send_message(row, true);
        target_values[index][15] = "DONE";
      } 
    }
    else{
      Logger.log("ELSE");
      Logger.log(row);
    }
 });
 sheet.getRange(range).setValues(target_values);

}

function send_message(row, reminder){
  const url = '<slack_hook>'
  var file_link = '<file_link>'

  var event_date = 
  Utilities.formatDate(new Date(row[5]), Session.getScriptTimeZone(), 'dd-MM-YYYY');
  var deadline = 
  Utilities.formatDate(new Date(row[9]), Session.getScriptTimeZone(), 'dd-MM-YYYY');
  var current_date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(),'dd-MM-YYYY');

         var data = {
          'text': '*Zatražio/la:* ' + row[1] + '\n'+ 
                  '*Događaj:* ' + row[4] + '\n'+ 
                  '*Datum događaja:* ' + event_date + '\n'+
                  '*Treba:* ' + row[10] + '\n' +
                  '*Treba do:* ' + deadline + '\n'+ 
                  '*Današnji datum:* ' + current_date  + '\n' +
                  '*Link na tablicu:* ' + file_link  + '\n'          
          
          } 

          var params = {
            'method': 'post',
            'contentType': 'application/json',
            'payload': JSON.stringify(data)
          }

          var sendMsg = UrlFetchApp.fetch(url, params)
          var responseCode = sendMsg.getResponseCode()


}


