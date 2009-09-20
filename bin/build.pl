#!/usr/bin/perl

use strict;
use warnings;

use JavaScript::Minifier::XS qw(minify);

my @files  = (
  'inc/raphael.js',
  'inc/g.raphael.js',
  'inc/g.pie.js',
  #'inc/g.line.js',
  #'inc/g.dot.js',
  #'inc/g.bar.js',
  'lib/Raphael.js',
  'lib/Raphael/Layer.js',
  'lib/Raphael/Chart.js',
  'lib/Raphael/Chart/Column.js',
  'lib/Raphael/Chart/Pie.js'
);

my $js = "";
foreach my $file(@files) {
    my $var;
    { local $/ = undef; local *FILE; open FILE, "<", $file or die; $var = <FILE>; close FILE }
    if($var =~ /,[\s\\]*?[\]\}]/g) {
        warn $file . ' contains trailing comma: '. line_by_pos($var, pos($var));
    } elsif($var =~ /console\.log/g) {
        warn $file . ' contains console.log: '. pos($var);
    }
    $js .= minify($var).$/.$/;
    
}

open FILE, '>', 'build/ext.ux.raphael-min.js';
print FILE $js;
close FILE;

sub line_by_pos {
    my ($file, $pos) = @_;
    my $i = 1;
    while($file =~ /\n/g) {
        last if(pos($file) > $pos);
        $i++;
    }
    return $i;
}