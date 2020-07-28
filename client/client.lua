local VehicleSystem = exports["vehicle-system"]
local PoliceSystem = exports["police-system"]
local open = false

AddEventHandler("onClientResourceStart", function() 
  ToggleMenu(false)
end)

Citizen.CreateThread(function() 
  while true do
    Citizen.Wait(0)
    if open then
      DisableControlAction(1, 140, true) -- Attack
      DisableControlAction(1, 141, true) -- Attack
      DisableControlAction(1, 142, true) -- Attack
      DisableControlAction(1, 24, true) -- Attack
      DisableControlAction(1, 257, true) -- Attack
      DisableControlAction(1, 263, true) -- Attack
      DisableControlAction(1, 264, true) -- Attack
      DisableControlAction(0, 1, true)
      DisableControlAction(0, 2, true)
      DisableControlAction(0, 106, true)
    end
  end
end)

Citizen.CreateThread(function() 
  while true do
    Citizen.Wait(0)    
    SetNuiFocusKeepInput(open)

    if IsControlJustPressed(1, 166) and not open then
      ToggleMenu(true)
    end
  end
end)

function ToggleMenu(_open) 
  open = _open
  SetNuiFocus(open, open)
  SendNUIMessage({
    type = "action-menu",
    inService = PoliceSystem:IsPlayerInService(),
    on = open
  })
end

-- NUI Callbacks
RegisterNUICallback('toggle-engine', function(data, cb) 
  VehicleSystem:ToggleEngine()
  cb("success")
end)

RegisterNUICallback('toggle-hood', function(data, cb) 
  VehicleSystem:ToggleHood()
  cb("success")
end)

RegisterNUICallback('toggle-trunk', function(data, cb) 
  VehicleSystem:ToggleTrunk()
  cb("success")
end)

RegisterNUICallback('toggle-fldoor', function(data, cb) 
  VehicleSystem:ToggleDriverDoor()
  cb("success")
end)

RegisterNUICallback('toggle-frdoor', function(data, cb) 
  VehicleSystem:TogglePassengerDoor()
  cb('success')
end)

RegisterNUICallback('toggle-bldoor', function(data, cb) 
  VehicleSystem:ToggleBackLeftDoor()
  cb("success")
end)

RegisterNUICallback('toggle-brdoor', function(data, cb) 
  VehicleSystem:ToggleBackRightDoor()
  cb('success')
end)

RegisterNUICallback('exit-menu', function(data, cb)
  ToggleMenu(false)
  cb("exited from menu")
end)