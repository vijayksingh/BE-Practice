let numbers = [1; 2; 3; 4; 5; 6; 7; 8; 9; 10]

let doubled = List.map
    (fun num -> num * 2)
    numbers;;

let filtered = List.filter
    (fun num -> num mod 2 = 0)
    numbers;;

let product = List.fold_left
    (fun acc num -> acc * num)
    1 filtered;;


(* Recursive Functions *)
let rec fibonacci n = if n < 2 then n else fibonacci (n - 1) + fibonacci (n - 2);;
fibonacci 10;;

let rec sum_list list = 
  match list with 
    | [] -> 0
    | hd::tl -> hd + sum_list tl 

let sum = sum_list numbers;;

(* Higher Order Functions *)
let greater_than n = fun m -> m > n;;
let greater_than_10 = greater_than 10;;
greater_than_10 7;;


let make_multiplier n = fun m -> m * n;;
let times_10 = make_multiplier 10;;
times_10 5;;


let add_three_numbers a b c = a + b + c;;
let add_ten_more = add_three_numbers 10
let result = add_ten_more 5 10;;
result;;

let add_to_list x list = list @ [x];;

let new_list = add_to_list 4 [1; 2; 3]

(* Pattern Matching *)
let describe_list list = 
  match list with 
  | [] -> "empty"
  | [_] -> "singleton"
  | _ -> "a list"

let result = describe_list []
let single_result = describe_list [1]
