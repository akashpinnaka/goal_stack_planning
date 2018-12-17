
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

var init_slots = [["A", "D", "E", "I", "M"], ["B", "F", "G"], ["C", "H", "K"], ["J", "L", "N"]];
var final_slots = [["G", "H", "I"], ["C", "B", "K", "J"], ["A", "D", "L", "M"], ["E", "F", "N"]];



console.log(init_slots)
console.log(final_slots)

function getLocationOf(label, ref){
  found = false
  let details = {slot:"", position : false , on : false, top: false}
  for(slot in ref){
      let blockCount = ref[slot].length-1
      let blocks  = ref[slot]
      for(pos in blocks ){
          if(blocks[pos]== label){
              details.slot = Number(slot)+1
              details.position = pos
              if(blockCount == pos && pos !=0){
                  details.top = "clear"
                  details.on = blocks[Number(pos) - 1] || false
              }else if(pos == 0){
                  details.on = "table"
                  details.top = blocks[Number(pos) + 1] || "clear"
              }else{
                  details.on = blocks[Number(pos)-1] || false
                  details.top = blocks[Number(pos)+1] || false
              }
              return details;
          }
      }
  }
}

Object.keys(init_on).forEach((block)=>{
    let blockDetails = getLocationOf(block, init_slots)
    init_on[block] = blockDetails.on
    init_top[block] = blockDetails.top
    init_loc[block] = blockDetails.slot
})

Object.keys(final_on).forEach((block)=>{
    let blockDetails = getLocationOf(block, final_slots)
    final_on[block] = blockDetails.on
    final_top[block] = blockDetails.top
    final_loc[block] = blockDetails.slot
})


$(document).ready(function () {
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

  function check_incomplete_information(init_on, final_on) {
    init_incomp = [], final_incomp = []
    // console.group("init : ")
    // console.log(init_on)
    // console.log(init_loc)
    // console.log(init_top)
    // console.groupEnd()
    // console.group("final: ")
    // console.log(final_on)
    // console.log(final_loc)
    // console.log(final_top)
    // console.groupEnd()
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
              // getLatestLocationsArray()
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
              plan_result.push("moveArmTo('" + pos + "')", "unstack('" + block + "','" + init_on[block] + "')", "moveArmTo('" + final_location + "')", "putdown('" + block + "','" + final_location + "')")
              // getLatestLocationsArray()
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
              plan_result.push("moveArmTo('" + pos + "')", "pickup('" + block + "')", "moveArmTo('" + init_loc[final_position] + "')", "stack('" + block + "', '" + final_position + "')")
              // getLatestLocationsArray()
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
                // getLatestLocationsArray()
              } else {
                plan_result.push("moveArmTo('" + pos + "')", "unstack('" + block + "' , '" + init_on[block] + "')", "moveArmTo('" + init_loc[final_position] + "')", "stack('" + block + "', '" + final_position + "')")
                // getLatestLocationsArray()
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
            plan_result.push("moveArmTo('" + pos + "')", "pickup('" + ob + "')", "moveArmTo('" + location + "')", "putdown('" + ob + "','" + location + "')")
            // getLatestLocationsArray()
          }
          else {            
            var pos = init_loc[ob]
            pickup(ob)
            stack(ob, key)
            plan_result.push("moveArmTo('" + pos + "')", "pickup('" + ob + "')", "moveArmTo('" + init_loc[key] + "')", "stack('" + ob + "', '" + key + "')")
            // getLatestLocationsArray()
          }
          return;
        }
        else {
          if (key == "table") {            
            var pos = init_loc[ob]
            unstack(ob, position_block)
            putdown(ob, location)
            plan_result.push("moveArmTo('" + pos + "')", "unstack('" + ob + "','" + position_block + "')", "moveArmTo('" + location + "')", "putdown('" + ob + "','" + location + "')")
            // getLatestLocationsArray()
          }
          else {
            var pos = init_loc[ob]
            var loc = init_on[ob]
            move(ob, position_block, key)
            if (loc == "table") {
              plan_result.push("moveArmTo('" + pos + "')", "pickup('" + ob + "')", "moveArmTo('" + init_loc[key] + "')", "stack('" + ob + "', '" + key + "')")
              // getLatestLocationsArray()
            }
            else {
              plan_result.push("moveArmTo('" + pos + "')", "unstack('" + ob + "' , '" + position_block + "')", "moveArmTo('" + init_loc[key] + "')", "stack('" + ob + "', '" + key + "')")
              // getLatestLocationsArray()
              // displayArray()
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

    var states = []
    var slots_in_state = init_slots.slice()    

    for(var i = 0; i < plan_result.length; i++) {
      if(plan_result[i].indexOf("stack") === 0 || plan_result[i].indexOf("putdown") !== -1) {
        states.push(plan_result[i]);
      }
    }

    console.log(states);

    // Function to display state in a div by appending to #results
    function displayState() {
      for(var i = 0; i < slots_in_state.length; i++) {
        $("#results").append("<span class='location'>L" + (i + 1) + "</span>")
        for(var j = 0; j < slots_in_state[i].length; j++) {
          $("#results").append("<span class='block'>" + slots_in_state[i][j] + "</span>");
        }
        $("#results").append("<br>");
      }
      $("#results").append("<br>");
    }

    // Function to pop and push when stack or pickup is called
    //getLocationOf(label, ref)
    function updateSlotsInState(action) {
      if(action.indexOf("stack") !== -1) {
        var block_to_stack = action.substring(7, 8);
        var block_to_get_stacked_on = action.substring(12 ,13);
        var location_of_block_to_stack = getLocationOf(block_to_stack, slots_in_state).slot - 1;
        var location_of_block_to_get_stacked_on = getLocationOf(block_to_get_stacked_on, slots_in_state).slot - 1;
        slots_in_state[location_of_block_to_stack].pop();
        slots_in_state[location_of_block_to_get_stacked_on].push(block_to_stack);
      } else if(action.indexOf("putdown") !== -1) {
        var block_to_stack = action.substring(9, 10);
        var location_of_block_to_stack = getLocationOf(block_to_stack, slots_in_state).slot - 1;
        var location_of_block_to_get_stacked_on = action.substring(13, 14);
        slots_in_state[location_of_block_to_stack].pop();
        slots_in_state[location_of_block_to_get_stacked_on].push(block_to_stack);
      }
      else {
        // Do nothing if action doesn't match
      }
    }

    for(var i = 0; i < states.length; i++) {
      updateSlotsInState(states[i]);
      displayState()
    }

  }); 
});

// $(document).ready(function() {
//   $("#present").on('click', function() {
//     $("#presentation").show();
//   });
// });