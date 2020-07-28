local show = false

AddEventHandler("onClientResourceStart", function() 
  displayActionMenu(false)
end)

Citizen.CreateThread(function() 
  while true do
    Citizen.Wait(0)
    if show then
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
    SetNuiFocusKeepInput(true)

    if IsControlJustPressed(1, 166) and not show then
      show = true
      displayActionMenu(show)
    end
  end
end)

RegisterNUICallback('toggle-trunk', function(data, cb) 
  local playerPed = GetPlayerPed(-1)
  local vehicle = nil

  if IsPedInAnyVehicle(playerPed, true) then
    vehicle = GetVehiclePedIsIn(playerPed, false)
    if GetVehicleDoorAngleRatio(vehicle, 5) ~= 0 then
      SetVehicleDoorShut(vehicle, 5, false)
    else
      SetVehicleDoorOpen(vehicle, 5, false, false)
    end
  end

  cb("success")
end)

RegisterNUICallback('exit-menu', function(data, cb)
  show = false
  displayActionMenu(false)

  cb("Exited from menu.")
end)

function displayActionMenu(show) 
  SetNuiFocus(show, show)
  SendNUIMessage({
    type = "action-menu",
    on = show
  })
end