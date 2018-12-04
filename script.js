
var l = []
l[0] = [0, 0, 0]  
l[1] = [0, 0, -2] 
l[2] = [0, 0, -4]  
l[3] = [0, 0, -6] 
var res



const callQueue = []



var init_on = new Object();
init_on = { A: false, B: false, C: false, D: false, E: false, F: false, G: false, H: false, I: false, J: false, K: false, L: false, M: false, N: false }

var init_top = new Object();
init_top = { A: 'clear', B: 'clear', C: 'clear', D: 'clear', E: 'clear', F: 'clear', G: 'clear', H: 'clear', I: 'clear', J: 'clear' , K: 'clear', L: 'clear', M: 'clear', N: 'clear'}

var init_loc = new Object();
init_loc = { A: false, B: false, C: false, D: false, E: false, F: false, G: false, H: false, I: false, J: false, K: false, L: false, M: false, N: false  }

var final_on = new Object();
final_on = { A: false, B: false, C: false, D: false, E: false, F: false, G: false, H: false, I: false, J: false, K: false, L: false, M: false, N: false  }

var final_top = new Object();
final_top = { A: 'clear', B: 'clear', C: 'clear', D: 'clear', E: 'clear', F: 'clear', G: 'clear', H: 'clear', I: 'clear', J: 'clear',  K: 'clear', L: 'clear', M: 'clear', N: 'clear' }

var final_loc = new Object();
final_loc = { A: false, B: false, C: false, D: false, E: false, F: false, G: false, H: false, I: false, J: false, K: false, L: false, M: false, N: false  }

var init_incomp = []
var final_incomp = []


var plan_result = []

var plan_show = []

var i_d = 0;

var i_e = 0;

var temp_object = "__object"

var init_slots = []
var final_slots = []

// from UI
var first_location_input = []
var second_location_input = []
var third_location_input = []
var fourth_location_input = []
var first_location_output = []
var second_location_output = []
var third_location_output = []
var fourth_location_output = []
$("#take_data").on('click', function() {
  console.log("******************")
  first_location_input = $("#init-location-1").val().split(",");
  second_location_input = $("#init-location-2").val().split(",");
  third_location_input = $("#init-location-3").val().split(",");
  fourth_location_input = $("#init-location-4").val().split(",");
  first_location_output = $("#final-location-1").val().split(",");
  second_location_output = $("#final-location-2").val().split(",");
  third_location_output = $("#final-location-3").val().split(",");
  fourth_location_output = $("#final-location-4").val().split(",");
  init_slots.push(first_location_input, second_location_input, third_location_input,fourth_location_input)
  final_slots.push(first_location_output, second_location_output, third_location_output, fourth_location_output)
});

//End of from UI

for(var i = 0; i < init_slots.length; i++) {
  for(var j = 0; j < i.length; j++) {
    if(j == 0) {
      init_on[j] = "table"
    }
    else {
      init_on[j] = 
    }
  }
}

// init_slots  = JSON.parse('[["A","B","C","D","E","F","G","H","I","J"],["K"],["L"],["M","N"]]')
// final_slots = JSON.parse('[["N","J","I","H","G","F","E","D","C","B","A"],["M"],["L"],["K"]]')

// Object.keys(init_on).forEach(function(_key ){
//   let index = init_slots.indexOf(key)
//   if(index > 0){

//     init_on[key] = init_slots[]

//   }else if(init_slots.indexOf(key) == 0){

//   }else if(init_slots.indexOf(key) == init_slots.length-1){

//   }

// })

console.log(init_slots)
console.log(final_slots)

init_on = JSON.parse('{"A":"table","B":"A","C":"B","D":"C","E":"D","F":"E","G":"F","H":"G","I":"H","J":"I","K":"table","L":"table","M":"table","N":"M"}')
init_loc = JSON.parse('{"A":"1","B":"1","C":"1","D":"1","E":"1","F":"1","G":"1","H":"1","I":"1","J":"1","K":"2","L":"3","M":"4","N":"4"}')
init_top = JSON.parse('{"A":"B","B":"C","C":"D","D":"E","E":"F","F":"G","G":"H","H":"I","I":"J","J":"clear","K":"clear","L":"clear","M":"N","N":"clear"}')

final_on= JSON.parse('{"A":"B","B":"C","C":"D","D":"E","E":"F","F":"G","G":"H","H":"I","I":"J","J":"N","K":"table","L":"table","M":"table","N":"table"}')
final_loc= JSON.parse('{"A":"1","B":"1","C":"1","D":"1","E":"1","F":"1","G":"1","H":"1","I":"1","J":"1","K":"4","L":"3","M":"2","N":"1"}')
final_top= JSON.parse('{"A":"clear","B":"A","C":"B","D":"C","E":"D","F":"E","G":"F","H":"G","I":"H","J":"I","K":"clear","L":"clear","M":"clear","N":"J"}')


$(document).ready(function () {

  
  var a = $("#init_loc_table option:selected").val()
  $("#init").append('<div  class="col-lg-3" id="init_loc1"> LOCATION ' + 1 + ' <br><br></div>')

  
  var a = $("#final_loc_table option:selected ").val()
  $("#final").append('<div class="col-lg-3" id="final_loc1"> LOCATION ' + 1 + ' <br><br></div>')

  
  $("#init_loc_table").change(function () {

    var a = $("#init_loc_table option:selected ").val()

    
    if (!($('#init_loc' + a + '').length)) {

      $("#init").append('   <div class="col-lg-3" id="init_loc' + a + '"> LOCATION ' + a + ' <br><br></div>')


    }
 
});



  
  $("#final_loc_table").change(function () {


    var a = $("#final_loc_table option:selected ").val()

    
    if (!($('#final_loc' + a + '').length))
      $("#final").append(' <div  class="col-lg-3" id="final_loc' + a + '"> LOCATION ' + a + ' <br><br></div>')

  });



  
  function count_blocks_at_loc_table(variable1, variable2, location) {
    var count = 0;
    Object.keys(variable1).forEach(function (key) {
      if (variable1[key] == "table")
        if (variable2[key] == location)
          count = count + 1;

    });
    return count
  }



  
  function count_blocks_on_table(variable) {
    var count = 0;
    Object.keys(variable).forEach(function (key) {
      if (variable[key] == "table")
        count = count + 1;

    });
    return count
  }


  $("#init_table_click").click(function () {

    
    var a = $("#init_table ").val()
    var loc = $("#init_loc_table option:selected ").val()

    
    if (init_on[a])
      alert("You cannot insert the BLOCK(" + a + ") on Table it is already on BLOCK(" + init_on[a] + ")")


    
    else if (count_blocks_at_loc_table(init_on, init_loc, loc))
      alert("There is already a block on table at this location you cannot insert more blocks on table")

    else {
      if (count_blocks_on_table(init_on) >= 4)
        alert("You cannot insert the BLOCK(" + a + ") on Table there are already 4 of the blocks on table")

      else {
        init_on[a] = "table"
        init_loc[a] = loc
        init_slots[loc-1].push(a)
        $("#init_loc" + loc).append("<span style='padding-left:20%;font-weight:normal'>TABLE(" + a + ")</span><br><br>")
      }
    }

  });



  $("#final_table_click").click(function () {
    
    var a = $("#final_table ").val()
    var loc = $("#final_loc_table option:selected ").val()


    
    if (final_on[a])
      alert("You cannot insert the BLOCK(" + a + ") on Table it is already on BLOCK(" + final_on[a] + ")")

    else if (count_blocks_at_loc_table(final_on, final_loc, loc))
      alert("There is already a block on table at this location you cannot insert more blocks on table")


    else {
      if (count_blocks_on_table(final_on) >= 4)
        alert("You cannot insert the BLOCK(" + a + ") on Table there are already 4 of the blocks on table")

      
      else {
        final_on[a] = "table"
        final_loc[a] = loc
        final_slots[loc-1].push(a)
        $("#final_loc" + loc).append("<span style='padding-left:20%;font-weight:normal'>TABLE(" + a + ")</span><br><br>")
      }
    }

  });

  $("#init_on_click").click(function () {

    var a = $("#init_table_1 ").val()
    var b = $("#init_table_2 ").val()
    var loc = $("#init_loc_table option:selected ").val()

    
    if (a == b)
      alert("A BLOCK CANNOT BE ON THE SAME BLOCK")

    
    else if (init_on[a])
      alert("You cannot keep BLOCK(" + a + ") on BLOCK(" + b + ") beacause it is on " + init_on[a])

    
    else if (init_top[b] != "clear")
      alert("BLOCK(" + b + ") already has top  BLOCK(" + init_top[b] + ") you cannot insert BLOCK(" + a + ")")


    
    else if (init_loc[b] != loc && init_loc[b])
      alert("You cannot place a BLOCK(" + a + ") on  BLOCK(" + b + ") which is at location " + init_loc[b] + " but you are in location " + loc)

    else if (!(init_loc[b]))
      alert("First enter BLOCK(" + b + ") on table ")



    

    else {
      init_on[a] = b
      init_loc[a] = loc
      init_top[b] = a
      init_slots[loc-1].push(a)
      $("#init_loc" + loc).append("<span style='padding-left:20%;font-weight:normal'>ON(" + a + " , " + b + ")</span><br><br>")
    }


  });





  $("#final_on_click").click(function () {

    var a = $("#final_table_1 ").val()
    var b = $("#final_table_2 ").val()
    var loc = $("#final_loc_table option:selected ").val()
    
    if (a == b)
      alert("A BLOCK CANNOT BE ON THE SAME BLOCK")

    
    else if (final_on[a])
      alert("You cannot keep BLOCK(" + a + ") on BLOCK(" + b + ") beacause it is on " + final_on[a])

    
    else if (final_top[b] != "clear")
      alert("BLOCK(" + b + ") already has top  BLOCK(" + final_top[b] + ") you cannot insert BLOCK(" + a + ")")

    

    else if (final_loc[b] != loc && final_loc[b]) {
      alert("You cannot place a BLOCK(" + a + ") on  BLOCK(" + b + ") which is at location " + final_loc[b] + " but you are in location " + loc)

    }

    else if (!(final_loc[b]))
      alert("First enter BLOCK(" + b + ") on table ")

    
    else {
      final_on[a] = b
      final_loc[a] = loc
      final_top[b] = a
      final_slots[loc-1].push(a)
      $("#final_loc" + loc).append("<span style='padding-left:20%;font-weight:normal'>ON(" + a + " , " + b + ")</span><br><br>")
    }


  });

  

  function check_incomplete_information(init_on, final_on) {

    
    
    
    init_incomp = [], final_incomp = []
    console.group("init : ")
    console.log(init_on)
    console.log(init_loc)
    console.log(init_top)
    console.groupEnd()
    console.group("final: ")
    console.log(final_on)
    console.log(final_loc)
    console.log(final_top)
    console.groupEnd()
    Object.keys(init_on).forEach(function (key) {
      if (!(init_on[key]))
        init_incomp.push(key)
    });


    Object.keys(final_on).forEach(function (key) {
      if (!(final_on[key]))
        final_incomp.push(key)
    });

    if ((final_incomp.length) || (init_incomp.length))
      return true
    else
      return false

  }



  
  $("#results_click").click(function (event) {
    event.preventDefault()
    console.log(init_slots)
    console.log(final_slots)    
    if (check_incomplete_information(init_on, final_on)) {
      alert("There is incomplete information in initial state regarding " + init_incomp + "\n There is incomplete information in final state regarding " + final_incomp)
      return
    }

    start_planner()

    function stack(block1, block2) {
      plan_show.push('$(".keepinfo").html("STACKING ' + block1 + ' ON ' + block2 + ' ")');
      init_on[block1] = block2
      init_top[block1] = "clear"
      init_loc[block1] = init_loc[block2]
      init_top[block2] = block1
      return res
    }


    function unstack(block1, block2) {
      plan_show.push('$(".keepinfo").html("UNSTACKING ' + block1 + ' FROM ' + block2 + '")');      
      init_on[block1] = "air"
      init_loc[block1] = "air"
      init_top[block1] = "air"      
      init_top[block2] = "clear"      
      return res
    }
    
    function pickup(block1) {
      plan_show.push('$(".keepinfo").html("PICKUP ' + block1 + ' ")');      
      init_on[block1] = "air"
      init_loc[block1] = "air"
      init_top[block1] = "air"      
      return res
    }


    function putdown(block, location) {
      plan_show.push('$(".keepinfo").html("PUTDOWN ' + block + ' AT LOCATION ' + location + '")');
      init_on[block] = "table"
      init_top[block] = "clear"
      init_loc[block] = location      
      return res
    }

    function move(block1, block2, block3) {
      plan_show.push('$(".keepinfo").html("MOVE ' + block1 + ' FROM ' + block2 + ' TO ' + block3 + '   ")');
      init_on[block1] = block3
      init_top[block1] = "clear"
      init_loc[block1] = init_loc[block3]
      init_top[block2] = "clear"
      init_top[block3] = block1
      return res
    }


    function start_planner() {
      Object.keys(init_on).forEach(function (key) {
        if (final_on[key] == "table") {
          initiate_to_plan(key)
        }
      });
    }

    
    function initiate_to_plan(key) {      
      if (final_on[key] == init_on[key] && final_loc[key] == init_loc[key])
        console.log(":-)")
      
      else
        actual_plan(key, final_loc[key], final_on[key])

      if (final_top[key] == "clear")
        return;

      initiate_to_plan(final_top[key])
    }




    function actual_plan(block, final_location, final_position) {

      
      if (final_position == "table") {
        
        if (init_on[block] == "table") {

          
          if (init_top[block] == "clear") {
            var ob = get_object_from_table_at_location(final_location)

            
            if (!(ob)) {
              var pos = init_loc[block]

              pickup(block)
              putdown(block, final_location)
              
              plan_result.push("moveArmTo('" + pos + "')", "pickup('" + block + "')", "moveArmTo('" + final_location + "')", "putdown('" + block + "','" + final_location + "')")
            }

            else {
              remove_block_and_its_items(ob, init_on[ob], init_loc[block], final_location, final_position)
              actual_plan(block, final_location, final_position)
            }
          } 

          else {

            remove_block_and_its_items(init_top[block], block, init_loc[block], final_location, final_position)
            actual_plan(block, final_location, final_position)
          }
        } 

        else {          
          if (init_top[block] == "clear") {
            var ob = get_object_from_table_at_location(final_location)
            if (!(ob)) {
              var pos = init_loc[block]
              unstack(block, init_on[block])
              putdown(block, final_location)
              plan_result.push("moveArmTo('" + pos + "')", "unstack('" + block + "','" + init_on[block] + "')", "moveArmTo('" + final_location + "')", "putdown('" + block + "'," + final_location + ")")
            }
            else {              
              remove_block_and_its_items(ob, init_on[ob], init_loc[block], final_location, final_position)
              actual_plan(block, final_location, final_position)
            }
          }
          else {
            remove_block_and_its_items(init_top[block], block, init_loc[block], final_location, final_position)
            actual_plan(block, final_location, final_position)
          }
        }
      }
      else {
        if (init_on[block] == "table") {
          if (init_top[block] == "clear") {
            if (init_top[final_position] == "clear") {
              var pos = init_loc[block]
              pickup(block, init_on[block])
              stack(block, final_position)
              plan_result.push("moveArmTo('" + pos + "')", "pickup('" + block + "')", "moveArmTo('" + init_loc[final_position] + "')", "stack('" + block + "','" + final_position + "')")
            }
            else {
              remove_block_and_its_items(init_top[final_position], final_position, init_loc[block], final_location, final_position)
            }
          }
          else {
            remove_block_and_its_items(init_top[block], block, init_loc[block], final_location, final_position)
            actual_plan(block, final_location, final_position)
          }
        }
        else {
          if (init_top[block] == "clear") {
            if (init_top[final_position] == "clear") {
              var pos = init_loc[block]
              var loc = init_on[block]
              move(block, init_on[block], final_position)
              if (loc == "table") {
                plan_result.push("moveArmTo('" + pos + "')", "pickup('" + block + "')", "moveArmTo('" + init_loc[final_position] + "')", "stack('" + block + "', '" + final_position + "')")
              } else {
                plan_result.push("moveArmTo('" + pos + "')", "unstack('" + block + "' , '" + init_on[block] + "')", "moveArmTo('" + init_loc[final_position] + "')", "stack('" + block + "', '" + final_position + "')")
              }
            }
            else {
              remove_block_and_its_items(init_top[final_position], final_position, init_loc[block], final_location, final_position)
            }
          }
          else {
            remove_block_and_its_items(init_top[block], block, init_loc[block], final_location, final_position)
            actual_plan(block, final_location, final_position)
          }
        }
      }
    }

    function get_object_from_table_at_location(location) {
      var ob = "__obj"
      Object.keys(init_on).forEach(function (key) {
        if (init_on[key] == "table") {          
          if (init_loc[key] == location)
            ob = key
        }
      });
      if (ob == "__obj")
        return false
      else
        return ob
    }

    function remove_block_and_its_items(ob, stop_ob, initial_location, final_location, final_position) {
      if (ob == stop_ob)
        return;
      if (init_top[ob] == "clear") {
        var position_block = init_on[ob]
        var location = get_shortest_location_except(initial_location, final_location)
        var key = get_top_key_of_location(location)
        if (position_block == "table") {
          if (key == "table") {            
            var pos = init_loc[ob]
            pickup(ob)
            putdown(ob, location)
            plan_result.push("moveArmTo('" + pos + "')", "pickup('" + ob + "')", "moveArmTo('" + location + "')", "putdown('" + ob + "')")
          }
          else {            
            var pos = init_loc[ob]
            pickup(ob)
            stack(ob, key)
            plan_result.push("moveArmTo('" + pos + "')", "pickup('" + ob + "')", "moveArmTo('" + init_loc[key] + "')", "stack('" + ob + "','" + key + "')")
          }
          return;
        }
        else {
          if (key == "table") {            
            var pos = init_loc[ob]
            unstack(ob, position_block)
            putdown(ob, location)
            plan_result.push("moveArmTo('" + pos + "')", "unstack('" + ob + "','" + position_block + "')", "moveArmTo('" + location + "')", "putdown('" + ob + "'," + location + ")")
          }
          else {
            var pos = init_loc[ob]
            var loc = init_on[ob]
            move(ob, position_block, key)
            if (loc == "table") {
              plan_result.push("moveArmTo('" + pos + "')", "pickup('" + ob + "')", "moveArmTo('" + init_loc[key] + "')", "stack('" + ob + "', '" + key + "')")
            }
            else {
              plan_result.push("moveArmTo('" + pos + "')", "unstack('" + ob + "' , '" + position_block + "')", "moveArmTo('" + init_loc[key] + "')", "stack('" + ob + "', '" + key + "')")
            }
          }
        }
        return remove_block_and_its_items(position_block, stop_ob, initial_location, final_location, final_position)
      }
      else
        return remove_block_and_its_items(init_top[ob], stop_ob, initial_location, final_location, final_position)
    }


    function get_top_key_of_location(location) {
      var obj = "__obj"
      Object.keys(init_loc).forEach(function (key) {        
      if (init_loc[key] == location && init_top[key] == "clear")
        obj = key
      });

      if (obj == "__obj")
        return "table"
      else
        return obj
    }

    function get_shortest_location_except(initial_location, final_location) {
      var temp = []
      var loc = []
      loc[0] = []
      loc[1] = []
      loc[2] = []
      loc[3] = []
      loc[4] = []

      Object.keys(init_loc).forEach(function (key) {
        if (init_loc[key] == 1)
          loc[1].push(key)
        else if (init_loc[key] == 2)
          loc[2].push(key)
        else if (init_loc[key] == 3)
          loc[3].push(key)
        else
          loc[4].push(key)
      });

      for (var i = 1; i <= 4; i++)
        if (i != initial_location && i != final_location)
          temp.push(i)


      var min = Math.min(loc[temp[0]].length, loc[temp[1]].length)

      if (min == loc[temp[0]].length)
        return temp[0]
      else
        return temp[1]
    }    
    console.log(plan_result)

    function pad(d) {
      return (d < 10) ? '0' + d.toString() : d.toString();
    }

    for(var i = 0; i < plan_result.length; i++) {
      $("#results").append("<h4>" + plan_result[i] + "</h4>");
    }
  }); 
});