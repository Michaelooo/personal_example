// 不同路径(一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角. 递归的思想
function robotPath(m, n) {
  if (m == 1 && n == 1) return 1;
  if (m == 1) return robotPath(m, n - 1);
  if (n == 1) return robotPath(m - 1, n);
  return robotPath(m - 1, n) + robotPath(m, n - 1);
}
