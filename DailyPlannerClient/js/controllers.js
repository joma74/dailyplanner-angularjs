/*global
    angular
 */

(function (angular) {
    "use strict";

    angular.module("controllers", [
        "services"
    ])

        .controller("taskListController", [
            "$scope",
            "localTaskStorage",

            function ($scope, storage) {
                $scope.tasks = storage.getTasks();
                $scope.newTaskTitle = null;

                $scope.addNewTask = function () {
                    var newTask;

                    if (!$scope.newTaskTitle) { return; }

                    newTask = {
                        title: $scope.newTaskTitle,
                        description: "",
                        duration: 0,
                        done: false
                    };

                    $scope.newTaskTitle = null;
                    $scope.tasks.unshift(newTask);
                    storage.saveTasks($scope.tasks);
                };

                $scope.deleteTask = function (taskIndex) {
                    $scope.tasks.splice(taskIndex, 1);
                    storage.saveTasks($scope.tasks);
                };

                $scope.toggleTaskStatus = function (task) {
                    task.done = !task.done;

                    $scope.tasks.sort(function (a, b) {
                        return (a.done ? 1 : 0) - (b.done ? 1 : 0);
                    });

                    storage.saveTasks($scope.tasks);
                };
            }
        ]);
}(angular));