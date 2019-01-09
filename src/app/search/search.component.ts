import { Component, OnInit } from '@angular/core';
import {patient} from "../models/patient";
import {PatientService} from "../patient.service";
declare const $;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  patients: patient[];
  
  constructor(private patientService: PatientService) {
    
   }

  ngOnInit() {

    var self = this;    // provides component visibility to jquery
  
    $(document).ready(function(){

      var substringMatcher = function(patients) {
        return function findMatches(prefix, cb) {
          var matches, substrRegex;
  
          // an array that will be populated with substring matches
          matches = [];
  
          // regex used to determine if a string contains the substring `q`
          substrRegex = new RegExp(prefix, 'i');
  
          // iterate through the pool of strings and for any string that
          // contains the substring 'prefix', add it to the `matches` array
          $.each(patients, function(i, patient) {
            if (substrRegex.test(patient.firstName) || 
                substrRegex.test(patient.lastName)) {
              matches.push(patient.lastName + " " + patient.firstName);
            }
          });
  
          cb(matches);
        };
      };
     
      var patients = self.getPatients();   // specifying self provides access to the component from jquery - see above

      $('#search .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
      },
      {
        name: 'patients',
        source: substringMatcher( patients )
      });

      $('#queryString').on('typeahead:selected', function (e, data) {
        // data contains the lastName firstName
          var patient = getPatient(data);

          $("#results").append("<b>" + patient.lastName + ", " + patient.firstName + "</b>"  + "&nbsp;&nbsp;" +
                               patient.dateOfbirth + "&nbsp;&nbsp;" +
                               patient.phoneNumber);
     
      });

      function getPatient(p) {

        // ex patient input: Brown Carla

        var patients = self.getPatients();   
  
        var substrRegex = new RegExp(p, 'i');
  
        return patients.map(item => item).filter(item => substrRegex.test(item.lastName + " " + item.firstName))[0];
      };
      
      $("#btnClear").click(function(){
        $('#queryString').val("");
        $('#results').empty();
      });

    }); // ready
   
  } //ngOnInit

  getPatients() : patient[] {
    return this.patientService.getPatients();
  }
} // OnInit
