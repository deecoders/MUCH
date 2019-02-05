

var verdict = [0,0,0,0,0,0,0,0,0,0];

var score = [0,0,0,0,0,0,0,0,0,0];

var Upload=0;

var oldScores;

var totalScore = 0;

var myApp = angular.module('ProjectApp', []);
 
     myApp.directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
 
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
 
     myApp.service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function(file, uploadUrl){
           var fd = new FormData();
           //console.log(file);
           //console.log(file.name);
           fd.append('fileName' ,file.name);
           fd.append('code', file);
           //console.log(fd);
       
       fd.append('name','power');


           $http.post(uploadUrl, fd, {
              transformRequest: angular.identity,
              headers: {'Content-Type': undefined}
           })
 
           .success(function(data){

            console.log(data);
            if(data == "No files were uploaded."){
              localStorage.setItem("messagePower",'Please upload a file to continue');

            }
            else{
              localStorage.setItem("messagePower",'');
              console.log('data=', data)
              console.log('newTest=', data["0"]["0"])
              if(data["0"]["0"] != undefined){
                    verdict[0]=data["0"]["0"];
              }
              for(i=1;i<data.length;i++){
                  
                  // if(data["0"]["0\n"] != undefined){
                  //   verdict[0]=data["0"]["0\n"];
                  //   console.log('daat[i][1]=', data["0"]["0\n"])
                  // }
                  if(data[i]["0"] != undefined){
                    verdict[i]=data[i]["0"];
                  }
                  // if(data[i]["0\n"] != undefined){
                  //   verdict[2]=data[2]["0\n"];
                  // }
              }
              console.log(verdict);
              var s='',o='';
              for(i=0;i<10;i++){
                var idL="testCase"+Number(i+1);
                //console.log(idL);
                if(verdict[i]=='1'){document.getElementById("testCase"+Number(i+1)).src="greenTick.jpg";score[i]=10;}
                else{document.getElementById("testCase"+Number(i+1)).src="redCross.png";score[i]=0;}
                document.getElementById('score'+Number(i+1)).innerHTML=score[i];
                totalScore+=score[i];
                s+=verdict[i];
                o+=oldScores[i];
              }

              /*if(verdict[0]=='1'){document.getElementById("testCase1").src="greenTick.jpg";score[0]=33.3;}
              else{document.getElementById("testCase1").src="redCross.png";score[0]=0.0;}
              if(verdict[1]=='1'){document.getElementById("testCase2").src="greenTick.jpg";score[1]=33.3;}
              else{document.getElementById("testCase2").src="redCross.png";score[1]=0.0;}
              if(verdict[2]=='1'){document.getElementById("testCase3").src="greenTick.jpg";score[2]=33.3;}
              else{document.getElementById("testCase3").src="redCross.png";score[2]=0.0;}*/
              /*totalScore = score[0] + score[1] + score[2];*/
              //if(totalScore == 99.89999999999999){totalScore=100;}
              /*document.getElementById('score1').innerHTML=score[0];document.getElementById('score2').innerHTML=score[1];document.getElementById('score3').innerHTML=score[2];document.getElementById('totalM').innerHTML='Your total score is : ' + totalScore;*/
              smoothScroll(document.getElementById('second'));

///////////////////// cheking score to send to api addScore to update score/////////////
              
              
              if(Number((s.match(/1/g) || []).length) > Number((o.match(/1/g) || []).length)){
                var link = '/addScore?name='+localStorage.getItem('storageName')+'&ques=power&str='+s;
                $http.get(link)
                .success(function(response){
                  
                });
              }

              else if(oldScores[1]=='-'){
               var link = '/addScore?name='+localStorage.getItem('storageName')+'&ques=power&str='+s;
                $http.get(link)
                .success(function(response){
                  
                }); 
              }
 
////////////////////////////////////////////////////////////////////////////////////////
           }})
 
 
           .error(function(){
           });
        }
     }]);
 
     myApp.controller('ProjectController', ['$scope', '$http','fileUpload', function($scope, $http,fileUpload){
      $scope.language="";
        $scope.uploadFile = function(){
           var file = $scope.myFile;
           var uploadUrl = "/upload?lang="+$scope.language;
            if(file!=undefined){
              var fileName = file.name;
              //console.log(fileName);
              var ext = fileName.split('.').pop();
              if(ext == "c" && $scope.language == "C" ){
                        fileUpload.uploadFileToUrl(file, uploadUrl);
                        $scope.messagePower='';
                }
                else if(ext == "cpp" && $scope.language == "C++")
                {                
                        fileUpload.uploadFileToUrl(file, uploadUrl);
                        $scope.messagePower='';
                }
                else if(ext == "java" && $scope.language == "Java")
                {
                        fileUpload.uploadFileToUrl(file, uploadUrl);
                        $scope.messagePower='';
                }
                else if(ext == "py" && $scope.language == "Python")
                {
                        fileUpload.uploadFileToUrl(file, uploadUrl);
                        $scope.messagePower='';
                }
                else if($scope.language == "")
                {
                        $scope.messagePower = 'Please select a language'
                }
                else{$scope.messagePower='You have submitted a wrong file. Please Check again!'}
            }
            else{
              $scope.messagePower='Please upload a file to continue'; 
            }
            windows.location='power.html';
            $scope.getStatus();
        };

        $scope.download=function(){
          console.log('download');
          $http.get('/download').success(function(response){
            console.log(response);
          });
          //window.open("/192.168.1.108:3000/download");
        }

         $scope.getStatus = function(){
          var userLoggedIn = localStorage.getItem("storageName");
          $http.get('/getScore?name='+localStorage.getItem("storageName")+'&ques=power')
          .success(function(response){
            console.log(response);
            console.log(localStorage.getItem("storageName"))
            oldScores = response;
            if(response[1]=='-'){document.getElementById('power').src="na.png";$scope.score=0;console.log('if1');}
            else if(response=='0000000000'){document.getElementById('power').src="redCross.png";$scope.score=0;console.log('if2');}
            else if(response=='1111111111'){document.getElementById('power').src="greenTick.jpg";$scope.score=100;console.log('if3');}
            else{
              document.getElementById('power').src="alert.png";
              /*if(Number(response[1])+Number(response[2])+Number(response[3])+){
                $scope.score=33.3
              }
              else{$scope.score=66.6
              }*/
              var tempScore=0;
              for(var i=1;i<=10;i++){
                tempScore=tempScore+10*response[i];
              }
              $scope.score=tempScore;
              console.log(tempScore);
            }
          })
          ;
        };
        $scope.getStatus();


        
        $scope.getTop = function(){
          $http.get('/getScoreQues?qname=power')
          .success(function(response){
            console.log(response);

              var dict = response;
              var items = Object.keys(dict).map(function(key) {
                   return [key, dict[key]];
              });


              items.sort(function(first, second) {
                  return second[1] - first[1];
              });

              console.log(items[0]);
              $scope.allS = [];for(i=0;i<10 && i<items.length;i++){items[i].push(i);$scope.allS.push(items[i]);}
              for(i=0;i<items.length;i++){
                if(items[i][0] == localStorage.getItem('storageName')){
                  $scope.idex = i+1;
                }
              }
              if($scope.idex>10 && $scope.idex!=-1){items[$scope.idex-1].push($scope.idex-1);$scope.allS.push(items[$scope.idex-1]);$scope.idex=11;}
              $scope.id = "Id" + $scope.idex;

          });
              var userLoggedIn=localStorage.getItem("storageName");
    $http.get('/isAdmin?name='+userLoggedIn)
    .success(function(response){
      console.log(response);
      $scope.isadmin=response;
      if(response=="1"){
        show="Admin requests !";
        var mydiv = document.getElementById("uploadQuest");
        var aTag = document.createElement('a');
        aTag.setAttribute('href',"../../uploadQuestion.html");
        aTag.innerHTML = "Upload Question";
        mydiv.appendChild(aTag);

        var mydiv2 = document.getElementById("admin2");
        var aTag2 = document.createElement('a');
        aTag2.setAttribute('href',"../../request.html");
        aTag2.innerHTML = show;
        mydiv2.appendChild(aTag2);

      }
      else {
        show="Become admin !";
        var mydiv3 = document.getElementById("admin2");
        var aTag3 = document.createElement('a');
        aTag3.setAttribute('href','#');

        aTag3.innerHTML = show;
        mydiv3.appendChild(aTag3);
      }
    });
        }

        $scope.getTop();
        
        $scope.ProgC = function(){
          $scope.language = "C";
        };

        $scope.ProgCpp = function(){
          $scope.language = "C++";
        };

         $scope.ProgJava = function(){
          $scope.language = "Java";
        };

        $scope.ProgPy = function(){
          $scope.language = "Python";
        };
        $scope.testcaseshow = function(e){
        var name = "power";
        var link = "../../getTestcase?name="+name+"&num="+e;
        window.open(link,'_blank');
};



     }]);


     window.smoothScroll = function(target) {
            $('#second').show();
            var scrollContainer = target;
            do { //find scroll container
                scrollContainer = scrollContainer.parentNode;
                if (!scrollContainer) return;
                scrollContainer.scrollTop += 1;
            } while (scrollContainer.scrollTop == 0);

            var targetY = 0;
            do { //find the top of target relatively to the container
                if (target == scrollContainer) break;
                targetY += target.offsetTop;
            } while (target = target.offsetParent);

            scroll = function(c, a, b, i) {
                i++; if (i > 30) return;
                c.scrollTop = a + (b - a) / 30 * i;
                setTimeout(function(){ scroll(c, a, b, i); }, 20);
            }
            // start scrolling
            scroll(scrollContainer, scrollContainer.scrollTop, targetY, 0);
        }