extern "C" {

static const int H = 7, W = 7;

static const char M[H][W] = {
  {'#','#','#','#','#','#','#'},
  {'#','.','.','.','#','.','#'},
  {'#','.','#','.','#','.','#'},
  {'#','.','#','.','.','.','#'},
  {'#','.','#','#','#','.','#'},
  {'#','.','.','.','#','.','E'},
  {'#','#','#','#','#','#','#'}
};

int move_from(int x, int y, char dir) {
    int nx = x, ny = y;

    if (dir == 'w') nx--;
    else if (dir == 's') nx++;
    else if (dir == 'a') ny--;
    else if (dir == 'd') ny++;
    else return -1;

    if (nx < 0 || nx >= H || ny < 0 || ny >= W) return -1;

    char cell = M[nx][ny];
    if (cell == '#') return -1;

    int packed = nx*100 + ny;

    if (cell == 'E') return 1000 + packed;

    return packed;
}

}
